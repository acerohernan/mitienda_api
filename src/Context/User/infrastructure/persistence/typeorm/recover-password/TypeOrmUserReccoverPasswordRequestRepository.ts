import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserRecoverPasswordRequestRepository } from "../../../../domain/ioc/UserRecoverPasswordRequestRepository";
import {
  UserRecoverPasswordRequest,
  UserRecoverPasswordRequestPrimitives,
} from "../../../../domain/UserRecoverPasswordRequest";
import { UserRecoverPasswordId } from "../../../../domain/value-objects/UserRecoverPasswordId";
import { UserRecoverPasswordEntity } from "./UserRecoverPasswordEntity";

@injectable()
export class TypeOrmUserReccoverPasswordRequestRepository
  extends TypeOrmRepository<
    UserRecoverPasswordRequest,
    UserRecoverPasswordRequestPrimitives
  >
  implements UserRecoverPasswordRequestRepository
{
  constructor() {
    super();
  }
  async delete(id: UserRecoverPasswordId): Promise<void> {
    return this.remove(id);
  }

  protected entitySchema(): EntitySchema<UserRecoverPasswordRequest> {
    return UserRecoverPasswordEntity;
  }

  async save(request: UserRecoverPasswordRequest): Promise<void> {
    return this.persist(request);
  }

  async search(
    id: UserRecoverPasswordId
  ): Promise<Nullable<UserRecoverPasswordRequest>> {
    const primitives = await this.searchById(id);

    if (!primitives) return null;

    return UserRecoverPasswordRequest.fromPrimitives(primitives);
  }
}
