import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserRecoverPasswordRequestRespository } from "../../../../domain/ioc/UserRecoverPasswordRequestRespository";
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
  implements UserRecoverPasswordRequestRespository
{
  constructor() {
    super();
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
    return this.search(id);
  }
}
