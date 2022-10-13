import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class StoreDomain extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.ensureThatTheDomainLenghtIsCorrect(value);
  }

  private ensureThatTheDomainLenghtIsCorrect(domain: string) {
    if (!domain)
      throw new InvalidArgumentException(
        `The value <${domain}> is not asignable to ${this.constructor.name}. The store domain should have al least 6 characters`
      );

    if (domain.length < 6) {
      throw new InvalidArgumentException(
        `The value <${domain}> is not asignable to ${this.constructor.name}. The store domain should have al least 6 characters`
      );
    }

    if (domain.length > 20) {
      throw new InvalidArgumentException(
        `The value <${domain}> is not asignable to ${this.constructor.name}. The store domain should have maximun 20 characters`
      );
    }
  }
}
