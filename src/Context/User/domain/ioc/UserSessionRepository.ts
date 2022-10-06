import { Nullable } from "../../../Shared/domain/Nullable";
import { UserSession } from "../UserSession";
import { UserSessionId } from "../value-objects/UserSessionId";

export interface UserSessionRepository {
  save(user: UserSession): Promise<void>;
  search(userId: UserSessionId): Promise<Nullable<UserSession>>;
}
