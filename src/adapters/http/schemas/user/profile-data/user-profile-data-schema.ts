import { z } from "@hono/zod-openapi";

// User Profile Data Schema
export const UserProfileDataSchema = z
  .object({
    first_name: z.string().openapi({
      description: "The first name of the user",
      example: "John",
    }),
    second_name: z.string().optional().nullable().openapi({
      description: "The second name of the user",
      example: "Doe",
    }),
    first_last_name: z.string().openapi({
      description: "The first last name of the user",
      example: "Doe",
    }),
    second_last_name: z.string().optional().nullable().openapi({
      description: "The second last name of the user",
      example: "Doe",
    }),
    email: z.email().openapi({
      description: "The email of the user",
      example: "john.doe@example.com",
    }),
    phone: z.string().openapi({
      description: "The phone of the user",
      example: "+573178901234",
    }),
    birth_date: z.string().openapi({
      description: "The birth date of the user",
      example: "1990-01-01",
    }),
    gender: z.enum(["Male", "Female"]).openapi({
      description: "The gender of the user",
      example: "Male",
    }),
    profile_picture: z.string().optional().nullable().openapi({
      description: "The profile picture of the user",
      example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    }),
  })
  .openapi("User Profile Data Model");
