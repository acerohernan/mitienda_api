import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Criteria } from "../../../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { UserId } from "../../../../../Shared/domain/UserId";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { StoreRepository } from "../../../../domain/ioc/StoreRepository";
import { Store, StorePrimitives } from "../../../../domain/Store";
import { StoreId } from "../../../../domain/value-objects/StoreId";
import { StoreEntity } from "./StoreEntity";

@injectable()
export class TypeOrmStoreRepository
  extends TypeOrmRepository<Store, StorePrimitives>
  implements StoreRepository
{
  protected entitySchema(): EntitySchema<StorePrimitives> {
    return StoreEntity;
  }
  async matching(criteria: Criteria): Promise<Store[]> {
    const storesInPrimitives = await this.searchByCriteria(criteria);
    return storesInPrimitives.map((store) => Store.fromPrimitives(store));
  }
  async save(store: Store): Promise<void> {
    this.persist(store);
  }
  async search(id: StoreId): Promise<Nullable<Store>> {
    const storeInPrimitive = await this.searchById(id);

    if (!storeInPrimitive) return null;

    return Store.fromPrimitives(storeInPrimitive);
  }

  async searchByUserId(user_id: UserId): Promise<Nullable<Store>> {
    const repository = await this.repository();
    const storePrimitives = await repository.findOneBy({
      user_id: user_id.value,
    });

    if (!storePrimitives) return null;

    return Store.fromPrimitives(storePrimitives);
  }
}
