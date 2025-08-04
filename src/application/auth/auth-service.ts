import { AuthBody } from "../../domain/auth/auth-body";
import { UserDbInterface } from "../../domain/user/user-db-interface";
import { UserProfileDataModel } from "../../domain/user/profile-data/user-profile-data-model";
import { PrismaClient } from "../../generated/prisma";
import { AuthUtil } from "../../shared/auth/auth-util";

export class AuthService {
    constructor(private readonly prisma: PrismaClient) {}

    async login(body: AuthBody): Promise<string | null>{
        try {
            const response:UserDbInterface | null = await this.prisma.users.findUnique({
                where:{
                    userName: body.user_name,
                    isActive: true,
                }
            });

            if(!response) return null;

            const isPasswordValid = await AuthUtil.verifyPassword(body.password, response.password);

            if(!isPasswordValid) return null;

            const profileData = response.profileData as UserProfileDataModel;
            const userFullName = `${profileData?.first_name} ${profileData?.second_name} ${profileData?.first_last_name} ${profileData?.second_last_name}`;

            const token = AuthUtil.generateJwtCookie(response.id, response.userName, userFullName, response.admin);

            return token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}