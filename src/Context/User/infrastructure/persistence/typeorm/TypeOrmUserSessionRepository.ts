import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../../Shared/domain/criteria/Filters";
import { Order } from "../../../../Shared/domain/criteria/Order";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserSessionRepository } from "../../../domain/ioc/UserSessionRepository";
import {
  UserSession,
  UserSessionPrimitives,
} from "../../../domain/UserSession";
import { UserSessionId } from "../../../domain/value-objects/UserSessionId";
import { UserSessionEntity } from "./UserSessionEntity";

@injectable()
export class TypeOrmUserSessionRepository
  extends TypeOrmRepository<UserSession, UserSessionPrimitives>
  implements UserSessionRepository
{
  constructor() {
    super();
  }

  protected entitySchema(): EntitySchema<UserSession> {
    return UserSessionEntity;
  }

  async search(userSessionId: UserSessionId): Promise<Nullable<UserSession>> {
    const filters: Array<Filter> = [
      Filter.fromValues({
        field: "id",
        operator: Operator.EQUAL,
        value: userSessionId.value,
      }),
    ];
    const criteria = new Criteria(new Filters(filters), Order.none(), 1, 0);
    const primitives = await this.searchByCriteria(criteria);

    if (primitives.length === 0) return null;
    return UserSession.fromPrimitives(primitives[0]);
  }

  async matching(criteria: Criteria): Promise<UserSession[]> {
    const primitives = await this.searchByCriteria(criteria);
    return primitives.map((primitiveSession) =>
      UserSession.fromPrimitives(primitiveSession)
    );
  }

  save(session: UserSession): Promise<void> {
    return this.persist(session);
  }

  delete(userSessionId: UserSessionId): Promise<void> {
    return this.remove(userSessionId);
  }
}
