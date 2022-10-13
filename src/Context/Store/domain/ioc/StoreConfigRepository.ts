import { Nullable } from "../../../Shared/domain/Nullable";
import { StoreConfig } from "../StoreConfig";
import { StoreConfigId } from "../value-objects/StoreConfigId";

export interface StoreConfigRepository {
  save(store: StoreConfig): Promise<void>;
  search(id: StoreConfigId): Promise<Nullable<StoreConfig>>;
}
