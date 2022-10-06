import { AppException, APP_EXCEPTIONS } from "./AppException";

export class InvalidArgumentException extends AppException {
  constructor(message?: string) {
    super(APP_EXCEPTIONS.INVALID_ARGUMENT, message);
  }
}
