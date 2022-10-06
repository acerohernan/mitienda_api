import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { UserId } from "../../../Shared/domain/UserId";
import { Uuid } from "../../../Shared/domain/Uuid";
import { UserRepository } from "../../domain/ioc/UserRepository";
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
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params): Promise<void> {
    /* First search if a user with same email exists */
    await this.verifyIfExistsAUserWithTheSameEmail(params.email);

    /* Creates the user */
    const id = new UserId(Uuid.random().value);
    const email = new UserEmail(params.email);
    const password = new UserPassword(params.password);
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
    /* Send to the user a link to complete his registration */
  }

  private async verifyIfExistsAUserWithTheSameEmail(
    email: string
  ): Promise<void> {
    const filters = Filters.fromValues([
      new Map<string, string>([
        ["field", "email"],
        ["operator", Operator.EQUAL],
        ["value", email],
      ]),
    ]);
    const criteria = new Criteria(filters, Order.none(), 1);
    const existsUser = await this.repository.searchByCriteria(criteria);

    console.log(existsUser);
  }
}
