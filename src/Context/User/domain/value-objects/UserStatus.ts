import { EnumValueObject } from "../../../Shared/domain/EnumValueObject";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";

export enum UserStatusEnum {
  INACTIVE = 0,
  ACTIVE = 1,
  IN_REGISTRATION = 2,
}

export class UserStatus extends EnumValueObject<UserStatusEnum> {
  constructor(value: UserStatusEnum) {
    super(value, [0, 1, 2]);
  }

  protected throwErrorForInvalidValue(value: UserStatusEnum): void {
    throw new InvalidArgumentException(
      `<${value} is not asignable to ${this.constructor.name}>`
    );
  }

  static fromPrimitive(value: number) {
    switch (value) {
      case UserStatusEnum.ACTIVE: {
        return new UserStatus(UserStatusEnum.ACTIVE);
      }

      case UserStatusEnum.INACTIVE: {
        return new UserStatus(UserStatusEnum.INACTIVE);
      }

      case UserStatusEnum.IN_REGISTRATION: {
        return new UserStatus(UserStatusEnum.IN_REGISTRATION);
      }

      default: {
        throw new InvalidArgumentException(
          `<${value} is not asignable to ${this.constructor.name}>`
        );
      }
    }
  }
}
