import { InvalidArgumentException } from "../../../Shared/domain/exceptions/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class StoreWhatsapp extends StringValueObject {
  private ONLY_NUMBERS_REGEX = /^[0-9]+$/;

  constructor(value: string) {
    super(value);

    this.ensureThatWhatsappContainOnlyNumbers(value);
  }

  private ensureThatWhatsappContainOnlyNumbers(whastapp: string) {
    if (!this.ONLY_NUMBERS_REGEX.test(whastapp)) {
      throw new InvalidArgumentException(
        `The value <${whastapp}> is not asignable to ${this.constructor.name}. The store whastapp only should contain a numeric characters`
      );
    }
  }
}
