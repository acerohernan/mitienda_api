import { inject } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserRepository } from "../ioc/UserRepository";
import { User } from "../User";
import { UserEmail } from "../value-objects/UserEmail";

export class UserEmailFinder {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(email: string): Promise<Nullable<User>> {
    const userEmail = new UserEmail(email);
    const criteria = new Criteria(
      new Filters([
        Filter.fromValues({
          field: "email",
          operator: Operator.EQUAL,
          value: userEmail.value,
        }),
      ]),
      Order.none(),
      1,
      0
    );

    return (await this.repository.matching(criteria))[0];
  }
}
