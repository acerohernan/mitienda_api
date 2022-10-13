import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class StoreName extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.ensureThatIsAValidStoreName(value);
  }

  private ensureThatIsAValidStoreName(name: string) {
    if (!name)
      throw new InvalidArgumentException(
        `The value <${name}> is not asignable to ${this.constructor.name}. The store name should have al least 6 characters`
      );

    if (name.length < 6) {
      throw new InvalidArgumentException(
        `The value <${name}> is not asignable to ${this.constructor.name}. The store name should have al least 6 characters`
      );
    }

    if (name.length > 50) {
      throw new InvalidArgumentException(
        `The value <${name}> is not asignable to ${this.constructor.name}. The store name should have maximun 50 characters`
      );
    }
  }
}
