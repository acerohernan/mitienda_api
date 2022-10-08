import bcrypt from "bcrypt";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserPassword extends StringValueObject {
  static async fromPrimitive(password: string): Promise<UserPassword> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return new UserPassword(hashedPassword);
  }

  static async compareHash(
    candiatePassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candiatePassword, hashedPassword);
  }
}
