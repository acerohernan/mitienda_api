import { UserId } from "../../Shared/domain/UserId";
import { UserSessionId } from "./value-objects/UserSessionId";

export type UserSessionProperties = {
  id: UserSessionId;
  user_id: UserId;
  agent: string;
  ip: string;
  expiration_date: Date;
};

export type UserSessionPrimitives = {
  id: string;
  user_id: string;
  agent: string;
  ip: string;
  expiration_date: Date;
};

export class UserSession {
  readonly id: UserSessionId;
  readonly user_id: UserId;
  readonly agent: string;
  readonly ip: string;
  readonly expiration_date: Date;

  constructor({
    id,
    user_id,
    ip,
    agent,
    expiration_date,
  }: UserSessionProperties) {
    this.id = id;
    this.user_id = user_id;
    this.agent = agent;
    this.ip = ip;
    this.expiration_date = expiration_date;
  }

  static create(properties: UserSessionProperties) {
    const session = new UserSession(properties);

    //send the event session.created

    return session;
  }

  toPrimitives(): UserSessionPrimitives {
    return {
      id: this.id.value,
      user_id: this.user_id.value,
      ip: this.ip,
      agent: this.agent,
      expiration_date: this.expiration_date,
    };
  }

  static fromPrimitives({
    id,
    user_id,
    agent,
    expiration_date,
    ip,
  }: UserSessionPrimitives): UserSession {
    return new UserSession({
      id: new UserSessionId(id),
      user_id: new UserId(user_id),
      agent,
      expiration_date,
      ip,
    });
  }
}
