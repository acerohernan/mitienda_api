import { v4, validate } from "uuid";
import { InvalidArgumentException } from "./exceptions/InvalidArgumentException";

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureThatIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  ensureThatIsValidUuid(id: string) {
    if (!validate(id))
      throw new InvalidArgumentException(
        `<${id} it not assignable to ${this.constructor.name}>`
      );
  }
}
