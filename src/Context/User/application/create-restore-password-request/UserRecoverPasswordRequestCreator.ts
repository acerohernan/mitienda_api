import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { Uuid } from "../../../Shared/domain/Uuid";
import { UserRecoverPasswordRequestRespository } from "../../domain/ioc/UserRecoverPasswordRequestRespository";
import { UserRepository } from "../../domain/ioc/UserRepository";
import { UserEmailFinder } from "../../domain/services/UserEmailFinder";
import { User } from "../../domain/User";
import { UserRecoverPasswordRequest } from "../../domain/UserRecoverPasswordRequest";
import { UserRecoverPasswordId } from "../../domain/value-objects/UserRecoverPasswordId";

type Params = {
  email: string;
};

@injectable()
export class UserRecoverPasswordRequestCreator {
  private userEmailFinder: UserEmailFinder;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository)
    protected userRepository: UserRepository,
    @inject(CONTAINER_TYPES.UserRecoverPasswordRequestRepository)
    private recoverPasswordRequestRespository: UserRecoverPasswordRequestRespository
  ) {
    this.userEmailFinder = new UserEmailFinder(userRepository);
  }

  async run({ email }: Params): Promise<{ code: string }> {
    const user = await this.getTheUserAndEnsureThatTheEmailExists(email);

    const id = new UserRecoverPasswordId(Uuid.random().value);
    const request = UserRecoverPasswordRequest.create({ id, user_id: user.id });

    await this.recoverPasswordRequestRespository.save(request);

    return { code: request.id.value };
  }

  private async getTheUserAndEnsureThatTheEmailExists(
    email: string
  ): Promise<User> {
    const user = await this.userEmailFinder.run(email);

    if (!user)
      throw new NotFoundException(`The email <${email}> is not registered`);

    return user;
  }
}
