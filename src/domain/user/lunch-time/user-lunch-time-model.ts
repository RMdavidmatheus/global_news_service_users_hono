import { z } from "@hono/zod-openapi";
import { UserLunchTimeSchema } from "../../../adapters/http/schemas/user/lunch-time/user-lunch-time-schema";

// User Lunch Time Model
export type UserLunchTimeModel = z.infer<typeof UserLunchTimeSchema>;
