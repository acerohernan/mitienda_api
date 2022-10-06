import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { UserId } from "../../../../Shared/domain/UserId";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserRepository } from "../../../domain/ioc/UserRepository";
import { User } from "../../../domain/User";
import { UserEntity } from "./UserEntity";

@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User>
  implements UserRepository
{
  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
  async searchByCriteria(criteria: Criteria): Promise<User[]> {
    return [];
  }
  async save(user: User): Promise<void> {
    console.log(user.toPrimitives());
    await this.persist(user);
  }
  search(userId: UserId): Promise<Nullable<User>> {
    throw new Error("Method not implemented.");
  }
}
