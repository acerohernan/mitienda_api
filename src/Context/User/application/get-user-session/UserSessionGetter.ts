import { inject, injectable } from "inversify";
import { omit } from "lodash";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { UserRepository } from "../../domain/ioc/UserRepository";
import { UserSessionRepository } from "../../domain/ioc/UserSessionRepository";
import { User } from "../../domain/User";
import { UserSession } from "../../domain/UserSession";
import { UserSessionId } from "../../domain/value-objects/UserSessionId";

type Params = {
  user_id: string;
  session_id: string;
};

type SessionInformation = {
  session: Record<string, any>;
  user: Record<string, any>;
};

@injectable()
export class UserSessionGetter {
  constructor(
    @inject(CONTAINER_TYPES.UserSessionRepository)
    private sessionRepository: UserSessionRepository,
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}

  async run(params: Params): Promise<SessionInformation> {
    const session_id = new UserSessionId(params.session_id);
    const user_id = new UserId(params.user_id);

    const { session, user } = await this.getSessionAndUserInformation(
      session_id,
      user_id
    );

    return {
      session: session.toPrimitives(),
      user: omit(user.toPrimitives(), ["password"]),
    };
  }

  private async getSessionAndUserInformation(
    session_id: UserSessionId,
    user_id: UserId
  ): Promise<{ session: UserSession; user: User }> {
    const [session, user] = await Promise.all([
      this.sessionRepository.search(session_id),
      this.userRepository.search(user_id),
    ]);

    if (!session || !user)
      throw new NotFoundException("Your session is invalid");

    return {
      user,
      session,
    };
  }
}
