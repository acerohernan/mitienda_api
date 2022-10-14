import { AgregateRoot } from "../../Shared/domain/AgregateRoot";
import { UserId } from "../../Shared/domain/UserId";
import { StoreCountryId } from "./value-objects/StoreCountryId";
import { StoreCurrencyId } from "./value-objects/StoreCurrencyId";
import { StoreDomain } from "./value-objects/StoreDomain";
import { StoreId } from "./value-objects/StoreId";
import { StoreName } from "./value-objects/StoreName";
import { StoreWhatsapp } from "./value-objects/StoreWhatsapp";

export type StorePrimitives = {
  id: string;
  user_id: string;
  tier_id: string;
  country_id: string;
  currency_id: string;
  whatsapp: string;
  type: string;
  expiration_date: Date;
  name: string;
  domain: string;
  logo_img: string | null;
  description: string | null;
  buttons_color: string | null;
  banner_img: string | null;
};

export type StoreProperties = {
  id: StoreId;
  user_id: UserId;
  tier_id: string;
  country_id: StoreCountryId;
  currency_id: StoreCurrencyId;
  type: string;
  whatsapp: StoreWhatsapp;
  expiration_date: Date;
  name: StoreName;
  domain: StoreDomain;
  logo_img: string | null;
  description: string | null;
  buttons_color: string | null;
  banner_img: string | null;
};

export class Store extends AgregateRoot {
  readonly id: StoreId;
  readonly user_id: UserId;
  readonly tier_id: string;
  readonly country_id: StoreCountryId;
  currency_id: StoreCurrencyId;
  whatsapp: StoreWhatsapp;
  type: string;
  name: StoreName;
  readonly expiration_date: Date;
  readonly domain: StoreDomain;
  readonly logo_img: string | null;
  readonly description: string | null;
  readonly buttons_color: string | null;
  readonly banner_img: string | null;

  constructor({
    id,
    user_id,
    tier_id,
    type,
    whatsapp,
    expiration_date,
    country_id,
    currency_id,
    name,
    domain,
    logo_img,
    description,
    buttons_color,
    banner_img,
  }: StoreProperties) {
    super();
    this.id = id;
    this.user_id = user_id;
    this.tier_id = tier_id;
    this.type = type;
    this.country_id = country_id;
    this.currency_id = currency_id;
    this.whatsapp = whatsapp;
    this.expiration_date = expiration_date;
    this.name = name;
    this.domain = domain;
    this.logo_img = logo_img;
    this.description = description;
    this.buttons_color = buttons_color;
    this.banner_img = banner_img;
  }

  static create(properties: StoreProperties): Store {
    const store = new Store(properties);

    /* Create the domian event store.created */

    return store;
  }

  public updateGeneralInformation(params: {
    currency_id: StoreCurrencyId;
    whatsapp: StoreWhatsapp;
    type: string;
    name: StoreName;
  }) {
    this.currency_id = params.currency_id;
    this.whatsapp = params.whatsapp;
    this.type = params.type;
    this.name = params.name;
  }

  toPrimitives(): StorePrimitives {
    return {
      id: this.id.value,
      user_id: this.user_id.value,
      tier_id: this.tier_id,
      type: this.type,
      whatsapp: this.whatsapp.value,
      expiration_date: this.expiration_date,
      country_id: this.country_id.value,
      currency_id: this.currency_id.value,
      name: this.name.value,
      domain: this.domain.value,
      logo_img: this.logo_img,
      description: this.description,
      buttons_color: this.buttons_color,
      banner_img: this.banner_img,
    };
  }

  static fromPrimitives(primitives: StorePrimitives): Store {
    return new Store({
      id: new StoreId(primitives.id),
      user_id: new UserId(primitives.user_id),
      tier_id: primitives.tier_id,
      type: primitives.type,
      whatsapp: new StoreWhatsapp(primitives.whatsapp),
      expiration_date: primitives.expiration_date,
      country_id: new StoreCountryId(primitives.country_id),
      currency_id: new StoreCurrencyId(primitives.currency_id),
      name: new StoreName(primitives.name),
      domain: new StoreDomain(primitives.domain),
      logo_img: primitives.logo_img,
      description: primitives.description,
      buttons_color: primitives.buttons_color,
      banner_img: primitives.banner_img,
    });
  }
}
