import { EntitySchema } from "typeorm";

export const StoreTeamEntity = new EntitySchema({
  name: "StoreTeam",
  tableName: "store_teams",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    store_id: {
      type: "varchar",
      unique: true,
    },
    img: {
      type: "varchar",
      nullable: true,
    },
    description: {
      type: "text",
      nullable: true,
    },
    video_link: {
      type: "varchar",
      nullable: true,
    },
  },
});
