import { FilterField } from "./FilterField";
import { FilterOperator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue
  ) {}

  static fromValues({
    field,
    operator,
    value,
  }: {
    field: string;
    operator: string;
    value: string;
  }) {
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    );
  }
}
