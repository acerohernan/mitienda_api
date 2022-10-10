import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { omit } from "lodash";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UnathorizedException } from "../../../Shared/domain/exceptions/UnathorizedException";
import { Uuid } from "../../../Shared/domain/Uuid";
import { UserRepository } from "../../domain/ioc/UserRepository";
import { UserSessionRepository } from "../../domain/ioc/UserSessionRepository";
import { UserEmailFinder } from "../../domain/services/UserEmailFinder";
import { User } from "../../domain/User";
import { UserSession } from "../../domain/UserSession";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserSessionId } from "../../domain/value-objects/UserSessionId";

type Params = {
  email: string;
  password: string;
  ip: string;
  agent: string;
};

@injectable()
export class UserSessionCreator {
  private userEmailFinder: UserEmailFinder;

  constructor(
    @inject(CONTAINER_TYPES.UserSessionRepository)
    private sessionRepository: UserSessionRepository,
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository
  ) {
    this.userEmailFinder = new UserEmailFinder(this.userRepository);
  }

  async run(params: Params) {
    const { email, password } = params;

    const user = await this.getUserByEmail(email);

    await this.verifyIfThePasswordMatch(user, password);

    const session = await this.createUserSession(user, "agent", "ip");

    await this.sessionRepository.save(session);

    const tokens = this.createTheAuthorizationTokens(
      user.id.value,
      session.id.value
    );

    return {
      ...tokens,
      user: omit(user.toPrimitives(), ["password"]),
    };
  }

  private async getUserByEmail(email: string): Promise<User> {
    const user = await this.userEmailFinder.run(email);

    if (!user) {
      console.log("Noexiste este", email);
      throw new NotFoundException(`The user with email ${email} not exists`);
    }

    return user;
  }

  private async verifyIfThePasswordMatch(
    user: User,
    passwordCandidate: string
  ): Promise<void> {
    const isValid = await UserPassword.compareHash(
      passwordCandidate,
      user.password.value
    );

    if (!isValid) throw new UnathorizedException("The credentials are invalid");
  }

  private async createUserSession(
    user: User,
    ip: string,
    agent: string
  ): Promise<UserSession> {
    const criteria = new Criteria(
      new Filters([
        Filter.fromValues({
          field: "user_id",
          operator: Operator.EQUAL,
          value: user.id.value,
        }),
      ]),
      Order.none(),
      1,
      0
    );

    const sessionExists = (await this.sessionRepository.matching(criteria))[0];

    if (sessionExists) await this.sessionRepository.delete(sessionExists.id);

    const id = new UserSessionId(Uuid.random().value);

    const session = UserSession.create({
      id,
      user_id: user.id,
      ip,
      agent,
      expiration_date: new Date(),
    });

    return session;
  }

  private createTheAuthorizationTokens(
    user_id: string,
    session_id: string
  ): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(
      { user: user_id, session: session_id },
      "secret",
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { user: user_id, session: session_id },
      "secret",
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
