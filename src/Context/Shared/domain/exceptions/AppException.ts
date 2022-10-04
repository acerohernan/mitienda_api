export const enum APP_EXCEPTIONS {
  INVALLID_ARGUMENT = "INVALID_ARGUMENT",
  UNATHORIZED = "UNATHORIZED",
  NOT_FOUND = "NOT_FOUND",
}

export abstract class AppException extends Error {
  protected abstract type: APP_EXCEPTIONS;

  constructor(message?: string) {
    super(message);
  }
}
