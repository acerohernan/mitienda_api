import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserId } from "../../../Shared/domain/UserId";
import { Store } from "../Store";
import { StoreId } from "../value-objects/StoreId";

export interface StoreRepository {
  save(store: Store): Promise<void>;
  search(id: StoreId): Promise<Nullable<Store>>;
  matching(criteria: Criteria): Promise<Array<Store>>;
  searchByUserId(user_id: UserId): Promise<Nullable<Store>>;
}
