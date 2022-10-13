import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { StoreConfigRepository } from "../../../../domain/ioc/StoreConfigRepository";
import {
  StoreConfig,
  StoreConfigPrimitives,
} from "../../../../domain/StoreConfig";
import { StoreConfigId } from "../../../../domain/value-objects/StoreConfigId";
import { StoreId } from "../../../../domain/value-objects/StoreId";
import { StoreConfigEntity } from "./StoreConfigEntity";

@injectable()
export class TypeOrmStoreConfigRepository
  extends TypeOrmRepository<StoreConfig, StoreConfigPrimitives>
  implements StoreConfigRepository
{
  protected entitySchema(): EntitySchema<StoreConfigPrimitives> {
    return StoreConfigEntity;
  }
  async save(store: StoreConfig): Promise<void> {
    this.persist(store);
  }
  async search(id: StoreConfigId): Promise<Nullable<StoreConfig>> {
    const config = await this.searchById(id);

    if (!config) return null;

    return StoreConfig.fromPrimitives(config);
  }

  async searchByStoreId(store_id: StoreId): Promise<Nullable<StoreConfig>> {
    const repository = await this.repository();
    const config = await repository.findOneBy({ store_id: store_id.value });

    if (!config) return null;

    return StoreConfig.fromPrimitives(config);
  }
}
