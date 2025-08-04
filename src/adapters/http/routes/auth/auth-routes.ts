import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PrismaClient } from "../../../../generated/prisma";
import { AuthService } from "../../../../application/auth/auth-service";
import { AuthBodySchema } from "../../schemas/auth/auth-body-schema";
import { AuthSchema } from "../../schemas/auth/auth-schema";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

// Auth app
export const authApp = new OpenAPIHono();

// Db client
const db = new PrismaClient();

// Inyect db to auth service
const authService = new AuthService(db);

// Login route
const loginRoute = createRoute({
    method: "post",
    path: "/login",
    summary: "Login User",
    tags: ["Auth"],
    description: "This endpoint is used to login a user into the system.",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: AuthBodySchema,
                    examples: {
                        "User logged in successfully": {
                            value: {
                                user_name: "JDOE",
                                password: "123456"
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "User logged in successfully",
            content: {
                "application/json": {
                    schema: AuthSchema,
                    examples: {
                        "User logged in successfully": {
                            value: {
                                token: "1234567890"
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: "Bad Request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "User already logged in"
                        })
                    })
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "Invalid credentials"
                        })
                    })
                }
            }
        },
        500: {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "Internal Server Error"
                        })
                    })
                }
            }
        }
    }
});

// Logout route
const logoutRoute = createRoute({
    method: "get",
    path: "/logout",
    summary: "Logout User",
    tags: ["Auth"],
    description: "This endpoint is used to logout a user from the system.",
    responses: {
        200: {
            description: "User logged out successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "User logged out successfully"
                        })
                    })
                }
            }
        },
        400: {
            description: "Bad Request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "User not logged in"
                        })
                    })
                }
            }
        },
        500: {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().openapi({
                            description: "The message of the error",
                            example: "Internal Server Error"
                        })
                    })
                }
            }
        }
    }
})

// Login controller
authApp.openapi(loginRoute, async (c) => {
    try {
        const body = c.req.valid("json");
        const response = await authService.login(body);

        if(!response) return c.json({ message: "Invalid credentials" }, 401);
        
        if(getCookie(c, "auth_token")){
            return c.json({ message: "User already logged in" }, 400);
        }

        setCookie(c, "auth_token", response, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 60 * 60,
            path: "/",
            domain: "localhost",
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            priority: "high",
        });
        
        return c.json({ token: response }, 200);
    } catch (error) {
        console.error("❌ Error logging in", error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

// Logout controller
authApp.openapi(logoutRoute, async (c) => {
    try {
        if(!getCookie(c, "auth_token")){
            return c.json({ message: "User not logged in" }, 400);
        }

        deleteCookie(c, "auth_token", {
            path: "/",
            domain: "localhost",
        });
        
        return c.json({ message: "User logged out successfully" }, 200);
    } catch (error) {
        console.error("❌ Error logging out", error);
        return c.json({ message: "Internal server error" }, 500);
    }
})