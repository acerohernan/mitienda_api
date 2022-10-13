import { Nullable } from "../../../Shared/domain/Nullable";
import { StoreSocial } from "../StoreSocial";
import { StoreSocialId } from "../value-objects/StoreSociald";

export interface StoreSocialRepository {
  save(store: StoreSocial): Promise<void>;
  search(id: StoreSocialId): Promise<Nullable<StoreSocial>>;
}
