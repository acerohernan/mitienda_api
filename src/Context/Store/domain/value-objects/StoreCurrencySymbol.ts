import { EnumValueObject } from "../../../Shared/domain/EnumValueObject";
import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";

export enum CurrencySymbols {
  PERUVIAN_SOL = "S/.",
  ARGENTINE_PESO = "$",
  US_DOLLAR = "$",
}

export class StoreCurrencySymbol extends EnumValueObject<CurrencySymbols> {
  constructor(value: CurrencySymbols) {
    super(value, Object.values(CurrencySymbols));
  }

  protected throwErrorForInvalidValue(value: CurrencySymbols): void {
    throw new InvalidArgumentException(
      `<${value} is not asignable to ${this.constructor.name}>`
    );
  }

  static fromPrimitive(value: string) {
    switch (value) {
      case CurrencySymbols.PERUVIAN_SOL: {
        return new StoreCurrencySymbol(CurrencySymbols.PERUVIAN_SOL);
      }

      case CurrencySymbols.ARGENTINE_PESO: {
        return new StoreCurrencySymbol(CurrencySymbols.ARGENTINE_PESO);
      }

      case CurrencySymbols.US_DOLLAR: {
        return new StoreCurrencySymbol(CurrencySymbols.US_DOLLAR);
      }

      default: {
        throw new InvalidArgumentException(
          `<${value} is not asignable to ${this.constructor.name}>`
        );
      }
    }
  }
}
