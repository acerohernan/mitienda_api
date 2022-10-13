import { EntitySchema } from "typeorm";

export const StoreEntity = new EntitySchema({
  name: "Store",
  tableName: "stores",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    user_id: {
      unique: true,
      type: "varchar",
    },
    domain: {
      type: "varchar",
      unique: true,
    },
    tier_id: {
      type: "varchar",
    },
    country_id: {
      type: "varchar",
    },
    currency_id: {
      type: "varchar",
    },
    whatsapp: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    expiration_date: {
      type: "date",
    },
    name: {
      type: "varchar",
      nullable: true,
    },
    logo_img: {
      type: "varchar",
      nullable: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
    buttons_color: {
      type: "varchar",
      nullable: true,
    },
    banner_img: {
      type: "varchar",
      nullable: true,
    },
  },
});
