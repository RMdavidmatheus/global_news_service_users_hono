import { PrismaClient } from "../../generated/prisma";
import { UserModel } from "../../domain/user/user-model";
import { UserDbInterface } from "../../domain/user/user-db-interface";
import { UserUtil } from "../../shared/user/user-util";
import { UserBody } from "../../domain/user/user-body";
import { UserLunchTimeModel } from "../../domain/user/lunch-time/user-lunch-time-model";
import { UserLunchTimeBody } from "../../domain/user/lunch-time/user-lunch-time-body";
import { UserProfileDataModel } from "../../domain/user/profile-data/user-profile-data-model";
import { GlobalUtil } from "../../shared/global/global-util";
import { AuthUtil } from "../../shared/auth/auth-util";

export class UserService {
  // Constructor
  constructor(private readonly db: PrismaClient) {}

  // Get all users
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const response: UserDbInterface[] = await this.db.users.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          userName: "asc",
        },
      });

      if (!response) return [];

      return UserUtil.mapUserDbToUserModel(response);
    } catch (error) {
      console.error("❌ Error getting all users", error);
      throw error;
    }
  }

  // Get user by id
  async getUserById(id: string): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null =
        await this.db.users.findUnique({
          where: {
            id: id,
            isActive: true,
          },
        });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error getting user by id", error);
      throw error;
    }
  }

  // Create user
  async createUser(body: UserBody): Promise<UserModel | null> {
    try {
      const response: UserDbInterface = await this.db.users.create({
        data: {
          userName: body.user_name.toUpperCase(),
          password: await AuthUtil.hashPassword(body.password),
          lunchTime: undefined,
          profileData: {
            first_name: GlobalUtil.capitalizeFirstLetter(
              body.profile_data.first_name
            ),
            second_name: body.profile_data.second_name
              ? GlobalUtil.capitalizeFirstLetter(body.profile_data.second_name)
              : null,
            first_last_name: GlobalUtil.capitalizeFirstLetter(
              body.profile_data.first_last_name
            ),
            second_last_name: body.profile_data.second_last_name
              ? GlobalUtil.capitalizeFirstLetter(
                  body.profile_data.second_last_name
                )
              : null,
            email: body.profile_data.email,
            phone: body.profile_data.phone,
            birth_date: body.profile_data.birth_date,
            gender: GlobalUtil.capitalizeFirstLetter(body.profile_data.gender),
            profile_picture: body.profile_data.profile_picture
              ? body.profile_data.profile_picture
              : null,
          },
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error creating user", error);
      throw error;
    }
  }

  // Update user by id this method is only for users admin
  async updateUser(
    id: string,
    body: UserProfileDataModel
  ): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null = await this.db.users.update({
        where: {
          id: id,
          isActive: true,
        },
        data: {
          profileData: body,
          updatedAt: new Date(),
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error updating user", error);
      throw error;
    }
  }

  // Patch password
  async patchPassword(id: string, password: string): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null = await this.db.users.update({
        where: {
          id: id,
          isActive: true,
        },
        data: {
          password: password,
          updatedAt: new Date(),
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error patching password", error);
      throw error;
    }
  }

  // Patch attemps
  async patchAttemps(id: string, attemps: number): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null = await this.db.users.update({
        where: {
          id: id,
          isActive: true,
        },
        data: {
          attemps: attemps,
          updatedAt: new Date(),
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error patching attemps", error);
      throw error;
    }
  }

  // Patch lunch time
  async patchLunchTime(
    id: string,
    body: UserLunchTimeBody
  ): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null = await this.db.users.update({
        where: {
          id: id,
          isActive: true,
        },
        data: {
          lunchTime: {
            is_lunching: body.is_lunching,
            schedule_user: body.schedule_user,
            initial_time: new Date(),
            final_time: new Date(
              new Date().getTime() +
                UserUtil.calculateFinalTime(body.schedule_user) * 60000
            ),
            elapsed_time: UserUtil.calculateElapsedTime(
              new Date(),
              new Date(
                new Date().getTime() +
                  UserUtil.calculateFinalTime(body.schedule_user) * 60000
              )
            ),
          },
          updatedAt: new Date(),
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error patching lunch time", error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(id: string): Promise<UserModel | null> {
    try {
      const response: UserDbInterface | null = await this.db.users.update({
        where: {
          id: id,
          isActive: true,
        },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });

      if (!response) return null;

      return UserUtil.mapUserDbToUserModelOneUser(response);
    } catch (error) {
      console.error("❌ Error deleting user", error);
      throw error;
    }
  }
}
