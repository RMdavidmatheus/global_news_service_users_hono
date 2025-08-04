import { z } from "@hono/zod-openapi";
import { UserLunchTimeSchema } from "./lunch-time/user-lunch-time-schema";
import { UserProfileDataSchema } from "./profile-data/user-profile-data-schema";

// User Schema
export const UserSchema = z.object({
  id: z.uuid().openapi({
    description: "The unique identifier for the user",
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
  admin: z.boolean().openapi({
    description: "Whether the user is an admin",
    example: false,
  }),
  user_name: z.string().openapi({
    description: "The username for the user",
    example: "JDOE",
  }),
  password: z.string().openapi({
    description: "The password for the user",
    example: "password",
  }),
  attemps: z.number().openapi({
    description: "The number of attemps to login for the user",
    example: 0,
  }),
  lunch_time: UserLunchTimeSchema.openapi({
    description: "The lunch time of the user",
    example: {
      is_lunching: false,
      schedule_user: "N",
      initial_time: "12:00",
      final_time: "13:00",
      elapsed_time: "1 hour and 30 minutes",
    },
  }),
  profile_data: UserProfileDataSchema.openapi({
    description: "The profile data of the user",
    example: {
      fisrt_name: "John",
      second_name: "Doe",
      first_last_name: "Doe",
      second_last_name: "Doe",
      email: "john.doe@example.com",
      phone: "+573178901234",
      birth_date: "1990-01-01",
      gender: "Male",
      profile_picture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    },
  }),
  created_at: z.string().openapi({
    description: "The date and time the user was created",
    example: "2021-01-01T00:00:00.000Z",
  }),
  updated_at: z.string().optional().nullable().openapi({
    description: "The date and time the user was updated",
    example: "2021-01-01T00:00:00.000Z",
  }),
  deleted_at: z.string().optional().nullable().openapi({
    description: "The date and time the user was deleted",
    example: "2021-01-01T00:00:00.000Z",
  }),
}).openapi('User Model');
