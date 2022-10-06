import { EnumValueObject } from "../EnumValueObject";
import { InvalidArgumentException } from "../exceptions/InvalidArgumentException";

export enum OrderTypes {
  ASC = "asc",
  DESC = "desc",
  NONE = "none",
}

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes));
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  protected throwErrorForInvalidValue(value: OrderTypes): void {
    throw new InvalidArgumentException(`The order type ${value} is invalid`);
  }
}
