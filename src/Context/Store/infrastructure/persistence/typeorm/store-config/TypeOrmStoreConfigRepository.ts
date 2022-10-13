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
}
