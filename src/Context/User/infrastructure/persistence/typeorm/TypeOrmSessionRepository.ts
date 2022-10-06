import { EntitySchema } from "typeorm";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../../Shared/domain/criteria/Filters";
import { Order } from "../../../../Shared/domain/criteria/Order";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserSessionRepository } from "../../../domain/ioc/UserSessionRepository";
import { UserSession } from "../../../domain/UserSession";
import { UserSessionId } from "../../../domain/value-objects/UserSessionId";

export class TypeOrmSessionRepository
  extends TypeOrmRepository<UserSession>
  implements UserSessionRepository
{
  constructor() {
    super();
  }

  protected entitySchema(): EntitySchema<UserSession> {
    throw new Error("Method not implemented.");
  }

  save(session: UserSession): Promise<void> {
    return this.persist(session);
  }
  async search(userSessionId: UserSessionId): Promise<Nullable<UserSession>> {
    const filters: Array<Filter> = [
      Filter.fromValues(
        new Map([
          ["field", "id"],
          ["operator", Operator.EQUAL],
          ["value", userSessionId.value],
        ])
      ),
    ];
    const criteria = new Criteria(new Filters(filters), Order.none(), 1, 0);
    const users = await this.searchByCriteria(criteria);

    if (users.length === 0) return null;
    return users[0];
  }

  delete(userSessionId: UserSessionId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
