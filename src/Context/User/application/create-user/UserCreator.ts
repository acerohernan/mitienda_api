import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { DuplicatedEntityException } from "../../../Shared/domain/exceptions/DuplicatedEntityException";
import { UserId } from "../../../Shared/domain/UserId";
import { Uuid } from "../../../Shared/domain/Uuid";
import { UserRepository } from "../../domain/ioc/UserRepository";
import { UserEmailFinder } from "../../domain/services/UserEmailFinder";
import { User, UserStatusEnum } from "../../domain/User";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserEmailVerified } from "../../domain/value-objects/UserEmailVerified";
import { UserFirstName } from "../../domain/value-objects/UserFirstName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserPhone } from "../../domain/value-objects/UserPhone";
import { UserStatus } from "../../domain/value-objects/UserStatus";

type Params = {
  email: string;
  password: string;
  phone: string;
};

@injectable()
export class UserCreator {
  private userEmailFinder: UserEmailFinder;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {
    this.userEmailFinder = new UserEmailFinder(this.repository);
  }

  async run(params: Params): Promise<void> {
    await this.verifyIfExistsAUserWithTheSameEmail(params.email);
    const id = new UserId(Uuid.random().value);
    const email = new UserEmail(params.email);
    const password = UserPassword.fromPrimitive(params.password);
    const phone = new UserPhone(params.phone);
    const first_name = new UserFirstName(null);
    const last_name = new UserFirstName(null);
    const status = UserStatus.fromPrimitive(UserStatusEnum.IN_REGISTRATION);
    const email_verified = new UserEmailVerified(false);

    const user = User.create({
      id,
      email,
      password,
      phone,
      first_name,
      last_name,
      status,
      email_verified,
    });

    this.repository.save(user);

    /* Send all the events from the User Agregate */
    //TODO
    /* Send to the user a link to complete his registration */
    //TODO
  }

  private async verifyIfExistsAUserWithTheSameEmail(
    email: string
  ): Promise<void> {
    const user = await this.userEmailFinder.run(email);

    if (user)
      throw new DuplicatedEntityException(
        `The email <${email}> is already taken`
      );
  }
}
