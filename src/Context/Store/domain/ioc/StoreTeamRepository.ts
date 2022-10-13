import { Nullable } from "../../../Shared/domain/Nullable";
import { StoreTeam } from "../StoreTeam";
import { StoreId } from "../value-objects/StoreId";
import { StoreTeamId } from "../value-objects/StoreTeamId";

export interface StoreTeamRepository {
  save(store: StoreTeam): Promise<void>;
  search(id: StoreTeamId): Promise<Nullable<StoreTeam>>;
  searchByStoreId(store_id: StoreId): Promise<Nullable<StoreTeam>>;
}
