import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserSession } from "../UserSession";
import { UserSessionId } from "../value-objects/UserSessionId";

export interface UserSessionRepository {
  save(session: UserSession): Promise<void>;
  search(userSessionId: UserSessionId): Promise<Nullable<UserSession>>;
  delete(userSessionId: UserSessionId): Promise<void>;
  matching(criteria: Criteria): Promise<Array<UserSession>>;
}
