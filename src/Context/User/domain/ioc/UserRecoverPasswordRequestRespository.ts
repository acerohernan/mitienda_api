import { Nullable } from "../../../Shared/domain/Nullable";
import { UserRecoverPasswordRequest } from "../UserRecoverPasswordRequest";
import { UserRecoverPasswordId } from "../value-objects/UserRecoverPasswordId";

export interface UserRecoverPasswordRequestRespository {
  save(request: UserRecoverPasswordRequest): Promise<void>;
  search(
    id: UserRecoverPasswordId
  ): Promise<Nullable<UserRecoverPasswordRequest>>;
}
