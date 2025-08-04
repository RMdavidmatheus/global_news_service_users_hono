import { prisma } from './../../infrastructure/db/prisma-client';
import { PrismaClient } from "../../generated/prisma";
import { UserModel } from '../../domain/user/user-model';
import { UserDbInterface } from '../../domain/user/user-db-interface';
import { UserUtil } from '../../shared/user/user-util';

export class UserService {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllUsers(): Promise<UserModel[]> {
        try {
            const response: UserDbInterface[] = await this.prisma.users.findMany({
                where: {
                    isActive: true,
                }
            });

            if (!response) return [];

            return UserUtil.mapUserDbToUserModel(response);
        } catch (error) {
            console.error("❌ Error getting all users", error);
            throw error;
        }
    }

    
} 