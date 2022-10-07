import { AppException, APP_EXCEPTIONS } from "./AppException";

export class UnathorizedException extends AppException {
  constructor(message?: string) {
    super(APP_EXCEPTIONS.UNATHORIZED, message);
  }
}
