import { AgregateRoot } from "../../Shared/domain/AgregateRoot";
import { StoreId } from "./value-objects/StoreId";
import { StoreTeamId } from "./value-objects/StoreTeamId";

export type StoreTeamPrimitives = {
  id: string;
  store_id: string;
  img: string | null;
  description: string | null;
  video_link: string | null;
};
export type StoreTeamProperties = {
  id: StoreTeamId;
  store_id: StoreId;
  img: string | null;
  description: string | null;
  video_link: string | null;
};

export class StoreTeam extends AgregateRoot {
  readonly id: StoreTeamId;
  readonly store_id: StoreId;
  readonly img: string | null;
  readonly description: string | null;
  readonly video_link: string | null;

  constructor({
    id,
    store_id,
    img,
    description,
    video_link,
  }: StoreTeamProperties) {
    super();
    this.id = id;
    this.store_id = store_id;
    this.img = img;
    this.description = description;
    this.video_link = video_link;
  }

  toPrimitives(): StoreTeamPrimitives {
    return {
      id: this.id.value,
      store_id: this.store_id.value,
      description: this.description,
      img: this.img,
      video_link: this.video_link,
    };
  }

  static fromPrimitives(primitives: StoreTeamPrimitives): StoreTeam {
    return new StoreTeam({
      id: new StoreTeamId(primitives.id),
      store_id: new StoreId(primitives.store_id),
      img: primitives.img,
      description: primitives.description,
      video_link: primitives.video_link,
    });
  }
}
