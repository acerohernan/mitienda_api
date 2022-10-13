import { EntitySchema } from "typeorm";

export const StoreSocialEntity = new EntitySchema({
  name: "StoreSocial",
  tableName: "store_socials",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    store_id: {
      type: "varchar",
      unique: true,
    },
    facebook: {
      type: "varchar",
      nullable: true,
    },
    instagram: {
      type: "varchar",
      nullable: true,
    },
    pinterest: {
      type: "varchar",
      nullable: true,
    },
    twitter: {
      type: "varchar",
      nullable: true,
    },
    linkedin: {
      type: "varchar",
      nullable: true,
    },
    tiktok: {
      type: "varchar",
      nullable: true,
    },
    youtube: {
      type: "varchar",
      nullable: true,
    },
  },
});
