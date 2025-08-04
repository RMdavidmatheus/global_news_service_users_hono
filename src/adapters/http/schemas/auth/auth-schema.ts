import { z } from "zod";

export const AuthSchema = z.object({
    token: z.string().openapi({
        description: "The token for the user",
        example: "1234567890",
    }),
}).openapi("Auth Model");