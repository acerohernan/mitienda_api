import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserId } from "../../../Shared/domain/UserId";
import { User } from "../User";

export interface UserRepository {
  save(user: User): Promise<void>;
  search(userId: UserId): Promise<Nullable<User>>;
  searchByCriteria(criteria: Criteria): Promise<Array<User>>;
}
