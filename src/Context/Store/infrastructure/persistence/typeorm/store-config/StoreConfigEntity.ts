import { EntitySchema } from "typeorm";

export const StoreConfigEntity = new EntitySchema({
  name: "StoreConfig",
  tableName: "store_configs",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    store_id: {
      type: "varchar",
      unique: true,
    },
    requests_dni: {
      type: "bool",
      default: false,
    },
    add_delivery_date: {
      type: "bool",
      default: false,
    },
    add_comment: {
      type: "bool",
      default: false,
    },
    comment: {
      type: "text",
      nullable: true,
    },
  },
});
