import { Nullable } from "../../../Shared/domain/Nullable";
import { StoreConfig } from "../StoreConfig";
import { StoreConfigId } from "../value-objects/StoreConfigId";
import { StoreId } from "../value-objects/StoreId";

export interface StoreConfigRepository {
  save(store: StoreConfig): Promise<void>;
  search(id: StoreConfigId): Promise<Nullable<StoreConfig>>;
  searchByStoreId(store_id: StoreId): Promise<Nullable<StoreConfig>>;
}
