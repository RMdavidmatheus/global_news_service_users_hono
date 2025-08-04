import { DateTime } from "luxon";
import { UserSchema } from "../../adapters/http/schemas/user/user-schema";
import { UserLunchTimeModel } from "../../domain/user/lunch-time/user-lunch-time-model";
import { UserProfileDataModel } from "../../domain/user/profile-data/user-profile-data-model";
import { UserDbInterface } from "../../domain/user/user-db-interface";
import { UserModel } from "../../domain/user/user-model";
import { GlobalUtil } from "../global/global-util";

export class UserUtil {
  // Map User Db to User Model
  static mapUserDbToUserModel(data: UserDbInterface[]): UserModel[] {
    return data.map((user: UserDbInterface) => {
      return UserSchema.parse(
        GlobalUtil.removeNullsAndUndefined({
          id: user.id,
          admin: user.admin,
          user_name: user.userName,
          password: user.password,
          attemps: user.attemps,
          lunch_time: user.lunchTime as UserLunchTimeModel,
          profile_data: user.profileData as UserProfileDataModel,
          isActive: user.isActive,
          created_at: DateTime.fromJSDate(new Date(user.createdAt))
            .setZone("America/Bogota")
            .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
          updated_at: user.updatedAt
            ? DateTime.fromJSDate(new Date(user.updatedAt))
                .setZone("America/Bogota")
                .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
            : null,
          deleted_at: user.deletedAt
            ? DateTime.fromJSDate(new Date(user.deletedAt))
                .setZone("America/Bogota")
                .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
            : null,
        })
      );
    });
  }

  // Map user db to user model one user
  static mapUserDbToUserModelOneUser(data: UserDbInterface): UserModel {
    return this.mapUserDbToUserModel([data])[0];
  }

  // Elapsed time
  static calculateElapsedTime(initial: Date, final: Date): string {
    const differenceMs = final.getTime() - initial.getTime();

    const totalMinutes = Math.floor(differenceMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours} hora${hours > 1 ? "s" : ""} y ${minutes} minuto${
        minutes > 1 ? "s" : ""
      }`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
    }
  }

  static calculateFinalTime(schedule: string): number {
    switch (schedule.toUpperCase()) {
      case "N":
        return 30;
      case "D":
        return 60;
      default:
        return 0;
    }
  }
}
