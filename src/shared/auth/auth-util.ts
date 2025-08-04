import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthUtil {
    
  // Hash the password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify the password with the hashed password
  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate the JWT cookie
  static generateJwtCookie(
    userId: string,
    userName: string,
    userFullName: string,
    userAdmin: boolean
  ): string {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        id: userId,
        admin: userAdmin,
        username: userName,
        fullName: userFullName,
        exp: Math.floor(expirationTime.getTime() / 1000),
      },
      secretKey
    );

    return token;
  }
}
