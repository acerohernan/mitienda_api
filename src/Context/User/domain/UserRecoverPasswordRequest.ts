import { AgregateRoot } from "../../Shared/domain/AgregateRoot";
import { UserId } from "../../Shared/domain/UserId";
import { UserRecoverPasswordId } from "./value-objects/UserRecoverPasswordId";

export type UserRecoverPasswordRequestPrimitives = {
  id: string;
  user_id: string;
};

export type UserRecoverPasswordRequestProperties = {
  id: UserRecoverPasswordId;
  user_id: UserId;
};

export class UserRecoverPasswordRequest extends AgregateRoot {
  readonly id: UserRecoverPasswordId;
  readonly user_id: UserId;

  constructor({ id, user_id }: UserRecoverPasswordRequestProperties) {
    super();
    this.id = id;
    this.user_id = user_id;
  }

  static create({
    id,
    user_id,
  }: UserRecoverPasswordRequestProperties): UserRecoverPasswordRequest {
    const request = new UserRecoverPasswordRequest({ id, user_id });

    /* Register an event */

    return request;
  }

  static fromPrimitives({ id, user_id }: UserRecoverPasswordRequestPrimitives) {
    return new UserRecoverPasswordRequest({
      id: new UserRecoverPasswordId(id),
      user_id: new UserId(user_id),
    });
  }

  toPrimitives(): UserRecoverPasswordRequestPrimitives {
    return {
      id: this.id.value,
      user_id: this.user_id.value,
    };
  }
}
