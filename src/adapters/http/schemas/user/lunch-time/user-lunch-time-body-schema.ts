import { z } from "@hono/zod-openapi";

export const UserLunchTimeBodySchema = z
  .object({
    is_lunching: z.boolean().openapi({
      description: "Whether the user is lunching",
      example: false,
    }),
    schedule_user: z.enum(["N", "D", "F"]).openapi({
      description: "The schedule of the user",
    }),
  })
  .openapi("User Lunch Time Body");
