import { AppException, APP_EXCEPTIONS } from "./AppException";

export class DuplicatedEntityException extends AppException {
  constructor(message?: string) {
    super(APP_EXCEPTIONS.DUPLICATED, message);
  }
}
