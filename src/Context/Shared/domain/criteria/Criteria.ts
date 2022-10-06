import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
  constructor(
    readonly filters: Filters,
    readonly order: Order,
    readonly limit?: number,
    readonly offset?: number
  ) {}

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
