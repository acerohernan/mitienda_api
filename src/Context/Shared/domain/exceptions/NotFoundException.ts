import { AppException, APP_EXCEPTIONS } from "./AppException";

export class NotFoundException extends AppException {
  constructor(message?: string) {
    super(APP_EXCEPTIONS.NOT_FOUND, message);
  }
}
