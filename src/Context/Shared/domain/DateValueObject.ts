export abstract class DateValueObject {
  readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  isBeforeThan(date: Date): boolean {
    return this.value < date;
  }

  isAfterThan(date: Date): boolean {
    return this.value > date;
  }
}
