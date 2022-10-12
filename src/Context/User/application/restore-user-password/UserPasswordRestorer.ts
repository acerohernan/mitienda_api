import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { UserRecoverPasswordRequestRepository } from "../../domain/ioc/UserRecoverPasswordRequestRepository";
import { UserRepository } from "../../domain/ioc/UserRepository";
import { User } from "../../domain/User";
import { UserRecoverPasswordRequest } from "../../domain/UserRecoverPasswordRequest";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserRecoverPasswordId } from "../../domain/value-objects/UserRecoverPasswordId";

type Params = {
  request_id: string;
  password: string;
  re_password: string;
};

@injectable()
export class UserPasswordRestorer {
  constructor(
    @inject(CONTAINER_TYPES.UserRecoverPasswordRequestRepository)
    private requestRepository: UserRecoverPasswordRequestRepository,
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}

  async run({ request_id, password, re_password }: Params): Promise<void> {
    this.verifyIfThePasswordAndThePasswordConfirmationMatches(
      password,
      re_password
    );

    const id = new UserRecoverPasswordId(request_id);

    const request = await this.getRequestAndEnsureThatExists(id);

    const user = await this.getUserAndEnsureThatExists(request.user_id);
    const newPassword = UserPassword.fromPrimitive(password);
    user.changePassword(newPassword);

    await this.userRepository.save(user);

    await this.requestRepository.delete(id);
  }

  private verifyIfThePasswordAndThePasswordConfirmationMatches(
    password: string,
    passwordConfirmation: string
  ): void {
    if (password !== passwordConfirmation)
      throw new InvalidArgumentException(
        `The password confirmation not match with the password`
      );
  }

  private async getRequestAndEnsureThatExists(
    id: UserRecoverPasswordId
  ): Promise<UserRecoverPasswordRequest> {
    const request = await this.requestRepository.search(id);

    if (request === null)
      throw new NotFoundException(
        `The recover password request code <${id.value}> is invalid`
      );

    return request;
  }

  private async getUserAndEnsureThatExists(id: UserId): Promise<User> {
    const user = await this.userRepository.search(id);

    if (user === null)
      throw new NotFoundException(`The user with id <${id.value}> not exists`);

    return user;
  }
}
