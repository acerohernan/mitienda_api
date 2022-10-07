import { inject, injectable } from "inversify";
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
import { User } from "../../domain/User";
import { UserSession } from "../../domain/UserSession";
import { UserSessionId } from "../../domain/value-objects/UserSessionId";

type Params = {
  email: string;
  password: string;
  ip: string;
  agent: string;
};

@injectable()
export class UserSessionCreator {
  /* Change the inject type */
  constructor(
    @inject(CONTAINER_TYPES.UserSessionRepository)
    private sessionRepository: UserSessionRepository,
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}

  async run(params: Params) {
    const { email, password } = params;

    const user = await this.getUserByEmail(email);

    this.verifyIfThePasswordMatch(user, password);

    const session = await this.createUserSession(user, "agent", "ip");

    await this.sessionRepository.save(session);

    const tokens = this.createTheAuthorizationTokens(
      user.id.value,
      session.id.value
    );

    return {
      ...tokens,
      user: omit(user.toPrimitives(), ["password"]),
      session: session.toPrimitives(),
    };
  }

  private async getUserByEmail(email: string): Promise<User> {
    const filters: Array<Filter> = [
      Filter.fromValues({
        field: "email",
        operator: Operator.EQUAL,
        value: email,
      }),
    ];
    const criteria = new Criteria(new Filters(filters), Order.none(), 1, 0);
    const users = await this.userRepository.matching(criteria);

    if (users.length === 0)
      throw new NotFoundException(`The user with email ${email} not exists`);

    const user = users[0];

    return user;
  }

  private verifyIfThePasswordMatch(
    user: User,
    passwordCandidate: string
  ): void {
    const isValid = user.matchesPassword(passwordCandidate);

    if (!isValid) throw new UnathorizedException("The credentials are invalid");
  }

  private createTheAuthorizationTokens(
    user_id: string,
    session_id: string
  ): { access: string; refresh: string } {
    return {
      access: "access",
      refresh: "refresh",
    };
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
}
