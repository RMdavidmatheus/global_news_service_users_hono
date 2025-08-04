import { z } from "zod";
import { AuthBodySchema } from "../../adapters/http/schemas/auth/auth-body-schema";

export type AuthBody = z.infer<typeof AuthBodySchema>;