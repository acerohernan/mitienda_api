import { Nullable } from "../../../Shared/domain/Nullable";
import { UserRecoverPasswordRequest } from "../UserRecoverPasswordRequest";
import { UserRecoverPasswordId } from "../value-objects/UserRecoverPasswordId";

export interface UserRecoverPasswordRequestRepository {
  save(request: UserRecoverPasswordRequest): Promise<void>;
  search(
    id: UserRecoverPasswordId
  ): Promise<Nullable<UserRecoverPasswordRequest>>;
  delete(id: UserRecoverPasswordId): Promise<void>;
}
