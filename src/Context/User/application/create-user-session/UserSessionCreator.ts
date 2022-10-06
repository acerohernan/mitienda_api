import { inject } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { UserSessionRepository } from "../../domain/ioc/UserSessionRepository";

type Params = {
  email: string;
  password: string;
};

export class UserSessionCreator {
  /* Change the inject type */
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) repository: UserSessionRepository
  ) {}

  run(params: Params) {}
}
