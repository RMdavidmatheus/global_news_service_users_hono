import { z } from "@hono/zod-openapi";
import { UserBodySchema } from "../../adapters/http/schemas/user/user-body-schema";

// User Body
export type UserBody = z.infer<typeof UserBodySchema>;
