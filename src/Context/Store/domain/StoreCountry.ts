import { StoreCountryCode } from "./value-objects/StoreCountryCode";
import { StoreCountryId } from "./value-objects/StoreCountryId";

export type StoreCountryPrimitives = {
  id: string;
  code: string;
  name: string;
  currency_code: string;
  extension: string;
};
export type StoreCountryProperties = {
  id: StoreCountryId;
  code: StoreCountryCode;
  name: string;
  currency_code: string;
  extension: string;
};

export class StoreCountry {
  readonly id: StoreCountryId;
  readonly code: StoreCountryCode;
  readonly name: string;
  readonly currency_code: string;
  readonly extension: string;

  constructor({
    id,
    code,
    name,
    currency_code,
    extension,
  }: StoreCountryProperties) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.currency_code = currency_code;
    this.extension = extension;
  }

  toPrimitives(): StoreCountryPrimitives {
    return {
      id: this.id.value,
      code: this.code.value,
      name: this.name,
      currency_code: this.currency_code,
      extension: this.extension,
    };
  }

  static fromPrimitives(primitives: StoreCountryPrimitives): StoreCountry {
    return new StoreCountry({
      id: new StoreCountryId(primitives.id),
      code: StoreCountryCode.fromPrimitive(primitives.code),
      name: primitives.name,
      currency_code: primitives.currency_code,
      extension: primitives.extension,
    });
  }
}
