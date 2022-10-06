import { injectable } from "inversify";
import { EntitySchema, EntityTarget } from "typeorm";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { UserId } from "../../../../Shared/domain/UserId";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserRepository } from "../../../domain/ioc/UserRepository";
import { User } from "../../../domain/User";

@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User>
  implements UserRepository
{
  protected entitySchema(): EntityTarget<EntitySchema<User>> {
    throw new Error("Method not implemented.");
  }
  searchByCriteria(criteria: Criteria): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  search(userId: UserId): Promise<Nullable<User>> {
    throw new Error("Method not implemented.");
  }
}
