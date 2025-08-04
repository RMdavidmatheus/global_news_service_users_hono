import { JsonValue } from "../../generated/prisma/runtime/library";
import { UserModel } from "./user-model";

export interface UserDbInterface {
    id: string;
    admin: boolean;
    userName: string;
    password: string;
    attemps: number;
    lunchTime: JsonValue | null;
    profileData: JsonValue;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}