import { Filter, FilterPrimitives } from "./Filter";

export class Filters {
  constructor(readonly filters: Filter[]) {}

  static fromValues(filters: Array<FilterPrimitives>) {
    return new Filters(filters.map(Filter.fromValues));
  }

  static none(): Filters {
    return new Filters([]);
  }
}
