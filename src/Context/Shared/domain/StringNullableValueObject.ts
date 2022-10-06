export abstract class StringNullableValueObject {
  readonly value: string | null;

  constructor(value: string | null) {
    this.value = value;
  }

  haveAValue(): boolean {
    return this.value !== null;
  }
}
