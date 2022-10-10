import bcrypt from "bcrypt";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserPassword extends StringValueObject {
  static passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  /* The password should have a at least one lowercase letter, one uppercase letter and one numeric character. 
  The minimun lenght is 8 and the maximun is 100 */

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

  ensureIsAValidPassword(password: string) {
    if (UserPassword.passwordRegex.test(password)) return;

    throw new Error(
      `The value <${password}> is not asignable to ${this.constructor.name}`
    );
  }
}
