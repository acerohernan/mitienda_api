import { EntitySchema } from "typeorm";
import { UserSession } from "../../../domain/UserSession";

export const UserSessionEntity = new EntitySchema<UserSession>({
  name: "User_Session",
  tableName: "user_sessions",
  columns: {
    id: {
      primary: true,
      type: String,
    },
    ip: {
      type: String,
      length: 20,
    },
    agent: {
      type: String,
      length: 100,
    },
    user_id: {
      type: String,
      unique: true,
    },
    expiration_date: {
      type: Date,
    },
  },
});
