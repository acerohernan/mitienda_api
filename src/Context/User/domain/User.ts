import { AgregateRoot } from "../../Shared/domain/AgregateRoot";
import { UserId } from "../../Shared/domain/UserId";
import { UserEmail } from "./value-objects/UserEmail";
import { UserEmailVerified } from "./value-objects/UserEmailVerified";
import { UserFirstName } from "./value-objects/UserFirstName";
import { UserLastName } from "./value-objects/UserLastName";
import { UserPassword } from "./value-objects/UserPassword";
import { UserPhone } from "./value-objects/UserPhone";
import { UserStatus } from "./value-objects/UserStatus";

export const enum UserStatusEnum {
  INACTIVE,
  ACTIVE,
  IN_REGISTRATION,
}

export type UserProperties = {
  id: UserId;
  first_name: UserFirstName;
  last_name: UserLastName;
  email: UserEmail;
  password: UserPassword;
  phone: UserPhone;
  status: UserStatus;
  email_verified: UserEmailVerified;
};

export type UserPrimitives = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  phone: string;
  status: number;
  email_verified: boolean;
};

export class User extends AgregateRoot {
  readonly id: UserId;
  readonly first_name: UserFirstName;
  readonly last_name: UserLastName;
  readonly email: UserEmail;
  password: UserPassword;
  readonly phone: UserPhone;
  readonly status: UserStatus;
  readonly email_verified: UserEmailVerified;

  constructor({
    id,
    first_name,
    last_name,
    email,
    password,
    phone,
    status,
    email_verified,
  }: UserProperties) {
    super();
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status;
    this.email_verified = email_verified;
  }

  static create(properties: UserProperties): User {
    const user = new User(properties);

    /* Register the user.created event */

    return user;
  }

  public changePassword(newPassword: UserPassword) {
    /* Register the user.password.updated event */

    this.password = newPassword;
  }

  public matchesPassword(candiatePassword: string): boolean {
    return this.password.value === candiatePassword;
  }

  static fromPrimitives({
    id,
    first_name,
    last_name,
    email,
    password,
    phone,
    email_verified,
    status,
  }: UserPrimitives) {
    return new User({
      id: new UserId(id),
      first_name: new UserFirstName(first_name),
      last_name: new UserLastName(last_name),
      phone: new UserPhone(phone),
      email: new UserEmail(email),
      email_verified: new UserEmailVerified(email_verified),
      password: new UserPassword(password),
      status: UserStatus.fromPrimitive(status),
    });
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
      status: this.status.value,
      email_verified: this.email_verified.value,
    };
  }
}
