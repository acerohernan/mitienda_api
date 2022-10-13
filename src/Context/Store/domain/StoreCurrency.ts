import { StoreCurrencyCode } from "./value-objects/StoreCurrencyCode";
import { StoreCurrencyId } from "./value-objects/StoreCurrencyId";
import { StoreCurrencySymbol } from "./value-objects/StoreCurrencySymbol";

export type StoreCurrencyPrimitives = {
  id: string;
  code: string;
  symbol: string;
  name: string;
};
export type StoreCurrencyProperties = {
  id: StoreCurrencyId;
  code: StoreCurrencyCode;
  symbol: StoreCurrencySymbol;
  name: string;
};

export class StoreCurrency {
  readonly id: StoreCurrencyId;
  readonly code: StoreCurrencyCode;
  readonly symbol: StoreCurrencySymbol;
  readonly name: string;

  constructor({ id, code, symbol, name }: StoreCurrencyProperties) {
    this.id = id;
    this.code = code;
    this.symbol = symbol;
    this.name = name;
  }

  toPrimitives(): StoreCurrencyPrimitives {
    return {
      id: this.id.value,
      code: this.code.value,
      symbol: this.symbol.value,
      name: this.name,
    };
  }

  static fromPrimitves(primitives: StoreCurrencyPrimitives): StoreCurrency {
    return new StoreCurrency({
      id: new StoreCurrencyId(primitives.id),
      code: StoreCurrencyCode.fromPrimitive(primitives.code),
      symbol: StoreCurrencySymbol.fromPrimitive(primitives.symbol),
      name: primitives.name,
    });
  }
}
