import { inject } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserId } from "../../../Shared/domain/UserId";
import { UserRepository } from "../ioc/UserRepository";
import { User } from "../User";

export class UserFinder {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(userId: string): Promise<Nullable<User>> {
    const id = new UserId(userId);
    return await this.repository.search(id);
  }
}
