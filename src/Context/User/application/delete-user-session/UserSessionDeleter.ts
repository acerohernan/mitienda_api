import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { UserSessionRepository } from "../../domain/ioc/UserSessionRepository";
import { UserSessionId } from "../../domain/value-objects/UserSessionId";

type Params = {
  session_id: string;
  user_id: string;
};

@injectable()
export class UserSessionDeleter {
  constructor(
    @inject(CONTAINER_TYPES.UserSessionRepository)
    private repository: UserSessionRepository
  ) {}

  async run(params: Params): Promise<void> {
    const sessionId = new UserSessionId(params.session_id);
    await this.repository.delete(sessionId);
  }
}
