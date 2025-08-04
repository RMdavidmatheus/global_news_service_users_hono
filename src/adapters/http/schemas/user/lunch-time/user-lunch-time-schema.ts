import { z } from "@hono/zod-openapi";

// User Lunch Time Schema
export const UserLunchTimeSchema = z.object({
  is_lunching: z.boolean().openapi({
    description: "Whether the user is lunching",
    example: false,
  }),
  schedule_user: z.enum(["N","D"]).openapi({
    description: "The schedule of the user",
    example: "N",
  }),
  initial_time: z.string().openapi({
    description: "The initial time of the user",
    example: "12:00",
  }),
  final_time: z.string().openapi({
    description: "The final time of the user",
    example: "13:00",
  }),
  elapsed_time: z.string().openapi({
    description: "The elapsed time of the user",
    example: "1 hour and 30 minutes",
  }),
}).optional().openapi('User Lunch Time Model');