import { EntitySchema } from "typeorm";
import { UserRecoverPasswordRequest } from "../../../../domain/UserRecoverPasswordRequest";

export const UserRecoverPasswordEntity =
  new EntitySchema<UserRecoverPasswordRequest>({
    name: "UserRecoverPasswordRequest",
    tableName: "user_recover_password_requests",
    columns: {
      id: {
        type: String,
        primary: true,
      },
      user_id: {
        type: String,
      },
    },
  });
