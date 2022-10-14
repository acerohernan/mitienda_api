import { StoreConfigId } from "./value-objects/StoreConfigId";
import { StoreId } from "./value-objects/StoreId";

export type StoreConfigPrimitives = {
  id: string;
  store_id: string;
  request_dni: boolean;
  add_delivery_date: boolean;
  add_comment: boolean;
  comment: string | null;
};
export type StoreConfigProperties = {
  id: StoreConfigId;
  store_id: StoreId;
  request_dni: boolean;
  add_delivery_date: boolean;
  add_comment: boolean;
  comment: string | null;
};

export class StoreConfig {
  readonly id: StoreConfigId;
  readonly store_id: StoreId;
  request_dni: boolean;
  add_delivery_date: boolean;
  add_comment: boolean;
  comment: string | null;

  constructor({
    id,
    store_id,
    request_dni,
    add_delivery_date,
    add_comment,
    comment,
  }: StoreConfigProperties) {
    this.id = id;
    this.store_id = store_id;
    this.request_dni = request_dni;
    this.add_delivery_date = add_delivery_date;
    this.add_comment = add_comment;
    this.comment = comment;
  }

  updateConfigInformation(params: {
    request_dni: boolean;
    add_delivery_date: boolean;
    add_comment: boolean;
    comment: string | null;
  }) {
    this.request_dni = params.request_dni;
    this.add_delivery_date = params.add_delivery_date;
    this.add_comment = params.add_comment;
    this.comment = params.comment;
  }

  toPrimitives(): StoreConfigPrimitives {
    return {
      id: this.id.value,
      store_id: this.store_id.value,
      request_dni: this.request_dni,
      add_delivery_date: this.add_delivery_date,
      add_comment: this.add_comment,
      comment: this.comment,
    };
  }

  static fromPrimitives(primitives: StoreConfigPrimitives): StoreConfig {
    return new StoreConfig({
      id: new StoreConfigId(primitives.id),
      store_id: new StoreId(primitives.store_id),
      request_dni: primitives.request_dni,
      add_delivery_date: primitives.add_delivery_date,
      add_comment: primitives.add_comment,
      comment: primitives.comment,
    });
  }
}
