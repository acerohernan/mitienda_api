import bcrypt from "bcrypt";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserPassword extends StringValueObject {
  static passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,100}$/;
  /* The password should have a at least one lowercase letter, one uppercase letter and one numeric character. 
  The minimun lenght is 8 and the maximun is 100 */

  static fromPrimitive(password: string): UserPassword {
    UserPassword.ensureIsAValidPassword(password);
    const hashedPassword = UserPassword.hashPassword(password);
    return new UserPassword(hashedPassword);
  }

  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static compareHash(
    candiatePassword: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(candiatePassword, hashedPassword);
  }

  static ensureIsAValidPassword(password: string) {
    if (UserPassword.passwordRegex.test(password)) return;

    throw new InvalidArgumentException(
      `The value <${password}> is not asignable to UserPassword. The password should have a at least one lowercase letter, one uppercase letter and one numeric character. The minimun lenght is 8 and the maximun is 100`
    );
  }
}
