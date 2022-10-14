import { StoreId } from "./value-objects/StoreId";
import { StoreSocialId } from "./value-objects/StoreSociald";

export type StoreSocialPrimitives = {
  id: string;
  store_id: string;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
  linkedin: string | null;
  tiktok: string | null;
  youtube: string | null;
};
export type StoreSocialProperties = {
  id: StoreSocialId;
  store_id: StoreId;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
  linkedin: string | null;
  tiktok: string | null;
  youtube: string | null;
};

export class StoreSocial {
  readonly id: StoreSocialId;
  readonly store_id: StoreId;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
  linkedin: string | null;
  tiktok: string | null;
  youtube: string | null;

  constructor({
    id,
    store_id,
    facebook,
    instagram,
    pinterest,
    twitter,
    linkedin,
    tiktok,
    youtube,
  }: StoreSocialProperties) {
    this.id = id;
    this.store_id = store_id;
    this.facebook = facebook;
    this.instagram = instagram;
    this.pinterest = pinterest;
    this.twitter = twitter;
    this.linkedin = linkedin;
    this.tiktok = tiktok;
    this.youtube = youtube;
  }

  public updateSocialInformation(params: {
    facebook: string | null;
    instagram: string | null;
    pinterest: string | null;
    twitter: string | null;
    linkedin: string | null;
    tiktok: string | null;
    youtube: string | null;
  }) {
    this.facebook = params.facebook;
    this.instagram = params.instagram;
    this.pinterest = params.pinterest;
    this.twitter = params.twitter;
    this.linkedin = params.linkedin;
    this.tiktok = params.tiktok;
    this.youtube = params.youtube;
  }

  toPrimitives(): StoreSocialPrimitives {
    return {
      id: this.id.value,
      store_id: this.store_id.value,
      facebook: this.facebook,
      instagram: this.instagram,
      pinterest: this.pinterest,
      twitter: this.twitter,
      linkedin: this.linkedin,
      tiktok: this.tiktok,
      youtube: this.youtube,
    };
  }

  static fromPrimitives(primitives: StoreSocialPrimitives): StoreSocial {
    return new StoreSocial({
      id: new StoreSocialId(primitives.id),
      store_id: new StoreId(primitives.store_id),
      facebook: primitives.facebook,
      instagram: primitives.instagram,
      pinterest: primitives.pinterest,
      twitter: primitives.twitter,
      linkedin: primitives.linkedin,
      tiktok: primitives.tiktok,
      youtube: primitives.youtube,
    });
  }
}
