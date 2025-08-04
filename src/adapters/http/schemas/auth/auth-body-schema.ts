import { z } from "zod";

export const AuthBodySchema = z.object({
    user_name: z.string().min(3).max(20).openapi({
        description: "The username for the user",
        example: "JDOE",
    }),
    password: z.string().min(8).max(20).openapi({
        description: "The password for the user",
        example: "password",
    }),
}).openapi("Auth Body Model");