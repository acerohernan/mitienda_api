import { EnumValueObject } from "../../../Shared/domain/EnumValueObject";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";

export enum CurrencyCodes {
  PERUVIAN_SOL = "PEN",
  ARGENTINE_PESO = "ARS",
  US_DOLLAR = "USD",
}

export class StoreCurrencyCode extends EnumValueObject<CurrencyCodes> {
  constructor(value: CurrencyCodes) {
    super(value, Object.values(CurrencyCodes));
  }

  protected throwErrorForInvalidValue(value: CurrencyCodes): void {
    throw new InvalidArgumentException(
      `<${value} is not asignable to ${this.constructor.name}>`
    );
  }

  static fromPrimitive(value: string) {
    switch (value) {
      case CurrencyCodes.PERUVIAN_SOL: {
        return new StoreCurrencyCode(CurrencyCodes.PERUVIAN_SOL);
      }

      case CurrencyCodes.ARGENTINE_PESO: {
        return new StoreCurrencyCode(CurrencyCodes.ARGENTINE_PESO);
      }

      case CurrencyCodes.US_DOLLAR: {
        return new StoreCurrencyCode(CurrencyCodes.US_DOLLAR);
      }

      default: {
        throw new InvalidArgumentException(
          `<${value} is not asignable to ${this.constructor.name}>`
        );
      }
    }
  }
}
