import { UserLunchTimeModel } from "../../domain/user/lunch-time/user-lunch-time-model";
import { UserProfileDataModel } from "../../domain/user/profile-data/user-profile-data-model";
import { UserDbInterface } from "../../domain/user/user-db-interface";
import { UserModel } from "../../domain/user/user-model";

export class UserUtil {
    
    // Map User Db to User Model
    static mapUserDbToUserModel(data: UserDbInterface[]): UserModel[] {
        return data.map((user) => ({
            id: user.id,
            admin: user.admin,
            userName: user.userName,
            password: user.password,
            attemps: user.attemps,
            lunchTime: user.lunchTime as UserLunchTimeModel,
            profileData: user.profileData as UserProfileDataModel,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
        }));
    }

    // Map user db to user model one user
    static mapUserDbToUserModelOneUser(data: UserDbInterface): UserModel {
        return this.mapUserDbToUserModel([data])[0];
    }
}