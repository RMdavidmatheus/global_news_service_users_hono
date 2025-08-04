import { z } from "@hono/zod-openapi";
import { UserProfileDataSchema } from "../../../adapters/http/schemas/user/profile-data/user-profile-data-schema";

// User Profile Data Model
export type UserProfileDataModel = z.infer<typeof UserProfileDataSchema>;
