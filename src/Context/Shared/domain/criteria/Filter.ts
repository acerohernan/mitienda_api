import { FilterField } from "./FilterField";
import { FilterOperator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export type FilterPrimitives = {
  field: string;
  operator: string;
  value: string;
};

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue
  ) {}

  static fromValues({ field, operator, value }: FilterPrimitives) {
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    );
  }
}
