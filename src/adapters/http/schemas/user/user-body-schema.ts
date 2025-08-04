import { z } from "@hono/zod-openapi";
import { UserProfileDataSchema } from "./profile-data/user-profile-data-schema";

export const UserBodySchema = z.object({
    user_name: z.string().min(3).max(20).openapi({
        description: "The username for the user",
        example: "JDOE",
    }),
    password: z.string().min(8).max(20).openapi({
        description: "The password for the user",
        example: "password",
    }),
    profile_data: UserProfileDataSchema.openapi({
        description: "The profile data of the user",
        example: {
            first_name: "John",
            second_name: "Doe",
            first_last_name: "Doe",
            second_last_name: "Doe",
            email: "john.doe@example.com",
            phone: "+573178901234",
            birth_date: "1990-01-01",
            gender: "Male",
            profile_picture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
        }
    })
}).openapi("User Body")