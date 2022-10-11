import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserRecoverPasswordRequestRepository } from "../../domain/ioc/UserRecoverPasswordRequestRepository";
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
    private requestRepository: UserRecoverPasswordRequestRepository /* @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository */
  ) {}

  async run({ request_id, password, re_password }: Params): Promise<void> {
    this.verifyIfThePasswordAndThePasswordConfirmationMatches(
      password,
      re_password
    );

    const id = new UserRecoverPasswordId(request_id);
    const request = await this.requestRepository.search(id);

    this.ensureThatRequestExists(request, id);

    const newPassword = UserPassword.fromPrimitive(password);
    console.log("Is the new password", newPassword);
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

  private ensureThatRequestExists(
    request: Nullable<UserRecoverPasswordRequest>,
    id: UserRecoverPasswordId
  ): void {
    if (request === null)
      throw new NotFoundException(
        `The recover password request code <${id.value}> is invalid`
      );
  }
}
