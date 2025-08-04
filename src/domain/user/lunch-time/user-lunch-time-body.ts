import { z } from "@hono/zod-openapi";
import { UserLunchTimeBodySchema } from "../../../adapters/http/schemas/user/lunch-time/user-lunch-time-body-schema";

// User Lunch Time Body
export type UserLunchTimeBody = z.infer<typeof UserLunchTimeBodySchema>;
