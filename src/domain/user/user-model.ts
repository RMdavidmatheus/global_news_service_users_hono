import { z } from "@hono/zod-openapi";
import { UserSchema } from "../../adapters/http/schemas/user/user-schema";

// User Model
export type UserModel = z.infer<typeof UserSchema>;