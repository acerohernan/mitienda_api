import { EnumValueObject } from "../../../Shared/domain/EnumValueObject";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";

export enum CountryCodes {
  PERU = "PER",
  ARGENTINA = "ARG",
  EEUU = "USA",
}

export class StoreCountryCode extends EnumValueObject<CountryCodes> {
  constructor(value: CountryCodes) {
    super(value, Object.values(CountryCodes));
  }

  protected throwErrorForInvalidValue(value: CountryCodes): void {
    throw new InvalidArgumentException(
      `<${value} is not asignable to ${this.constructor.name}>`
    );
  }

  static fromPrimitive(value: string) {
    switch (value) {
      case CountryCodes.PERU: {
        return new StoreCountryCode(CountryCodes.PERU);
      }

      case CountryCodes.ARGENTINA: {
        return new StoreCountryCode(CountryCodes.ARGENTINA);
      }

      case CountryCodes.EEUU: {
        return new StoreCountryCode(CountryCodes.EEUU);
      }

      default: {
        throw new InvalidArgumentException(
          `<${value} is not asignable to ${this.constructor.name}>`
        );
      }
    }
  }
}
