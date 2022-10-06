import { EntitySchema } from "typeorm";
import { User } from "../../../domain/User";

export const UserEntity = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: String,
      primary: true,
    },
    first_name: {
      type: String,

      nullable: true,
    },
    last_name: {
      type: String,

      nullable: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: Number,

      default: 2,
    },
    password: {
      type: String,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
  },
});
