import { OrderBy } from "./OrderBy";
import { OrderType, OrderTypes } from "./OrderType";

export class Order {
  constructor(readonly orderBy: OrderBy, readonly orderType: OrderType) {}

  static fromValues(orderBy?: string, orderType?: string) {}

  static none(): Order {
    return new Order(new OrderBy(""), new OrderType(OrderTypes.NONE));
  }

  static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC));
  }

  static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC));
  }

  public hasOrder() {
    return !this.orderType.isNone();
  }
}
