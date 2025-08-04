import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PrismaClient } from "../../../../generated/prisma";
import { UserService } from "../../../../application/user/user-service";
import { UserSchema } from "../../schemas/user/user-schema";
import { UserBodySchema } from "../../schemas/user/user-body-schema";
import { UserProfileDataSchema } from "../../schemas/user/profile-data/user-profile-data-schema";
import { UserLunchTimeBodySchema } from "../../schemas/user/lunch-time/user-lunch-time-body-schema";

// User app
export const userApp = new OpenAPIHono();

// Prisma client
const db = new PrismaClient();

// Inyect db to user service
const userService = new UserService(db);

// Get all users route
const getAllUsers = createRoute({
  method: "get",
  path: "/",
  summary: "Get all users",
  description: "This route is used to get all users",
  tags: ["User"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(UserSchema),
          example: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              admin: false,
              userName: "JDOE",
              password: "password",
              attemps: 0,
              lunchTime: {
                is_lunching: false,
                schedule_user: "N",
                initial_time: "12:00",
                final_time: "13:00",
                elapsed_time: "1 hour and 30 minutes",
              },
              profileData: {
                first_name: "John",
                second_name: "Doe",
                first_last_name: "Doe",
                second_last_name: "Doe",
                email: "john.doe@example.com",
                phone: "+573178901234",
                birth_date: "1990-01-01",
                gender: "Male",
                profile_picture:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
              },
            },
          ],
        },
      },
      description: "Users retrieved successfully",
    },
    204: {
      description: "No content",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Get user by id route
const getUserById = createRoute({
  method: "get",
  path: "/user/:id",
  summary: "Get a user by id",
  description: "This route is used to get a user by id",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            admin: false,
            userName: "JDOE",
            password: "password",
            attemps: 0,
            lunchTime: {
              is_lunching: false,
              schedule_user: "N",
              initial_time: "12:00",
              final_time: "13:00",
              elapsed_time: "1 hour and 30 minutes",
            },
            profileData: {
              first_name: "John",
              second_name: "Doe",
              first_last_name: "Doe",
              second_last_name: "Doe",
              email: "john.doe@example.com",
              phone: "+573178901234",
              birth_date: "1990-01-01",
              gender: "Male",
              profile_picture:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
            },
          },
        },
      },
      description: "User retrieved successfully",
    },
    204: {
      description: "No content",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Create user route
const createUser = createRoute({
  method: "post",
  path: "/",
  summary: "Create a new user",
  description: "This route is used to create a new user",
  tags: ["User"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserBodySchema,
          example: {
            user_name: "JDOE",
            password: "password",
            profile_data: {
              first_name: "John",
              second_name: "Doe",
              first_last_name: "Doe",
              second_last_name: "Doe",
              email: "john.doe@example.com",
              phone: "+573178901234",
              birth_date: "1990-01-01",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "User created successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "User created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Error creating user",
          },
        },
      },
      description: "User not created",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Update user route
const updateUser = createRoute({
  method: "put",
  path: "/user/:id",
  summary: "Update a user",
  description: "This route is used to update a user",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: UserProfileDataSchema,
          example: {
            first_name: "John",
            second_name: "Doe",
            first_last_name: "Doe",
            second_last_name: "Doe",
            email: "john.doe@example.com",
            phone: "+573178901234",
            birth_date: "1990-01-01",
            gender: "Male",
            profile_picture:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "User updated successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "User updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Error updating user with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "User not updated",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Patch password route
const patchPassword = createRoute({
  method: "patch",
  path: "/user/:id/password",
  summary: "Patch a password",
  description: "This route is used to patch a password",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            password: z.string().min(8).max(20).openapi({
              description: "The password for the user",
              example: "12345678",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Password updated successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Password updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Error updating password with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Password not updated",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Patch attemps route
const patchAttemps = createRoute({
  method: "patch",
  path: "/user/:id/attemps",
  summary: "Patch attemps",
  description: "This route is used to patch attemps",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            attemps: z.number().openapi({
              description: "The attemps of the user",
              example: 0,
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Attemps updated successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Attemps updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Error updating attemps with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Attemps not updated",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Patch lunch time route
const patchLunchTime = createRoute({
  method: "patch",
  path: "/user/:id/lunch-time",
  summary: "Patch lunch time",
  description: "This route is used to patch lunch time",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: UserLunchTimeBodySchema,
          example: {
            is_lunching: false,
            schedule_user: "N",
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Lunch time updated successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Lunch time updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Error updating lunch time with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "Lunch time not updated",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Delete user route
const deleteUser = createRoute({
  method: "delete",
  path: "/user/delete/:id",
  summary: "Delete a user",
  description: "This route is used to delete a user",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.uuid().openapi({
        description: "The id of the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "User deleted successfully with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "User deleted successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message:
              "Error deleting user with id: 123e4567-e89b-12d3-a456-426614174000",
          },
        },
      },
      description: "User not deleted",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Get all users controller
userApp.openapi(getAllUsers, async (c) => {
  try {
    const response = await userService.getAllUsers();
    if (response.length === 0) return c.newResponse(null, 204);
    return c.json(response, 200);
  } catch (error) {
    console.error("❌ Error getting all users", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

// Get user by id controller
userApp.openapi(getUserById, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const response = await userService.getUserById(id);

    if (!response) return c.newResponse(null, 204);

    return c.json(response, 200);
  } catch (error) {
    console.error("❌ Error getting user by id", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

// Create user controller
userApp.openapi(createUser, async (c) => {
  try {
    const body = c.req.valid("json");
    const response = await userService.createUser(body);

    if (!response) return c.json({ message: "Error creating user" }, 400);
    return c.json(
      { message: `User created successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error creating user", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});

// Update user controller
userApp.openapi(updateUser, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const response = await userService.updateUser(id, body);

    if (!response)
      return c.json({ message: `Error updating user with id: ${id}` }, 400);
    return c.json(
      { message: `User updated successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error updating user", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});

// Patch password controller
userApp.openapi(patchPassword, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const response = await userService.patchPassword(id, body.password);

    if (!response)
      return c.json({ message: `Error updating password with id: ${id}` }, 400);
    return c.json(
      { message: `Password updated successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error updating password", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});

// Patch attemps controller
userApp.openapi(patchAttemps, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const response = await userService.patchAttemps(id, body.attemps);

    if (!response)
      return c.json({ message: `Error updating attemps with id: ${id}` }, 400);
    return c.json(
      { message: `Attemps updated successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error updating attemps", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});

// Patch lunch time controller
userApp.openapi(patchLunchTime, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const response = await userService.patchLunchTime(id, body);

    if (!response)
      return c.json(
        { message: `Error updating lunch time with id: ${id}` },
        400
      );
    return c.json(
      { message: `Lunch time updated successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error updating lunch time", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});

// Delete user controller
userApp.openapi(deleteUser, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const response = await userService.deleteUser(id);

    if (!response)
      return c.json({ message: `Error deleting user with id: ${id}` }, 400);
    return c.json(
      { message: `User deleted successfully with id: ${response.id}` },
      200
    );
  } catch (error) {
    console.error("❌ Error deleting user", error);
    return c.json({ message: `Internal server error` }, 500);
  }
});
