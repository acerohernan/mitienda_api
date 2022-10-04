import { AppException, APP_EXCEPTIONS } from "./AppException";

export class InvalidArgumentException extends AppException {
  protected type: APP_EXCEPTIONS;

  constructor(message?: string) {
    super(message);
    this.type = APP_EXCEPTIONS.INVALLID_ARGUMENT;
  }
}
