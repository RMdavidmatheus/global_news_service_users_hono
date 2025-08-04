import { z } from "zod";
import { AuthSchema } from "../../adapters/http/schemas/auth/auth-schema";

// Model for the auth response
export type AuthModel = z.infer<typeof AuthSchema>;