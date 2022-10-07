import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { UserId } from "../../../../Shared/domain/UserId";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserRepository } from "../../../domain/ioc/UserRepository";
import { User, UserPrimitives } from "../../../domain/User";
import { UserEntity } from "./UserEntity";

@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User, UserPrimitives>
  implements UserRepository
{
  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
  async matching(criteria: Criteria): Promise<User[]> {
    const primitives = await this.searchByCriteria(criteria);
    return primitives.map((userPrimitive) =>
      User.fromPrimitives(userPrimitive)
    );
  }
  async save(user: User): Promise<void> {
    await this.persist(user);
  }
  search(userId: UserId): Promise<Nullable<User>> {
    throw new Error("Method not implemented.");
  }
}
