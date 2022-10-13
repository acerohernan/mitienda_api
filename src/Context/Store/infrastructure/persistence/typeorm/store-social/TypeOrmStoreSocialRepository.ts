import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { StoreSocialRepository } from "../../../../domain/ioc/StoreSocialRepository";
import {
  StoreSocial,
  StoreSocialPrimitives,
} from "../../../../domain/StoreSocial";
import { StoreConfigId } from "../../../../domain/value-objects/StoreConfigId";
import { StoreSocialEntity } from "./StoreSocialEntity";

@injectable()
export class TypeOrmStoreSocialRepository
  extends TypeOrmRepository<StoreSocial, StoreSocialPrimitives>
  implements StoreSocialRepository
{
  protected entitySchema(): EntitySchema<StoreSocialPrimitives> {
    return StoreSocialEntity;
  }

  async save(social: StoreSocial): Promise<void> {
    this.persist(social);
  }
  async search(id: StoreConfigId): Promise<Nullable<StoreSocial>> {
    const social = await this.searchById(id);

    if (!social) return null;

    return StoreSocial.fromPrimitives(social);
  }
}
