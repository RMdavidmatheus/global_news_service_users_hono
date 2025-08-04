import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PrismaClient } from "../../../../generated/prisma";
import { UserService } from "../../../../application/user/user-service";
import { userSchema } from "../../schemas/user/user-schema";

// User app
export const userApp = new OpenAPIHono();

// Prisma client
const db = new PrismaClient();

// Inyect db to user service
const userService = new UserService(db);

// Get all users route
const getAllUsers = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(userSchema),
          example: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              admin: false,
              userName: "JDOE",
              password: "password",
              attemps: 0,
              lunchTime: {
                is_lunching: false,
                schedule_user: "N",
                initial_time: "12:00",
                final_time: "13:00",
                elapsed_time: "1 hour and 30 minutes",
              },
              profileData: {
                fisrt_name: "John",
                second_name: "Doe",
                first_last_name: "Doe",
                second_last_name: "Doe",
                email: "john.doe@example.com",
                phone: "+573178901234",
                birth_date: "1990-01-01",
                gender: "Male",
                profile_picture:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
              },
            },
          ],
        },
      },
      description: "Users retrieved successfully",
    },
    204: {
        description: "No content",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: "Internal server error",
          },
        },
      },
      description: "Internal server error",
    },
  },
});

// Get all users controller
userApp.openapi(getAllUsers, async (c) => {
    try {
        const response = await userService.getAllUsers();
        if (response.length === 0) return c.newResponse(null, 204);
        return c.json(response, 200);
    } catch (error) {
        console.error("❌ Error getting all users", error);
        return c.json({ message: "Internal server error" }, 500);
    }
})
