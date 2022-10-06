import { EntitySchema } from "typeorm";
import { User } from "../../../domain/User";

export const UserEntity = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
    },
    first_name: {
      type: String,
      length: 100,
      nullable: true,
    },
    last_name: {
      type: String,
      length: 100,
      nullable: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      length: 20,
    },
    status: {
      type: Number,
      length: 1,
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
