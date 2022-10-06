export const enum APP_EXCEPTIONS {
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  UNATHORIZED = "UNATHORIZED",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATED = "DUPLICATED",
}

export abstract class AppException extends Error {
  readonly type: APP_EXCEPTIONS;

  constructor(type: APP_EXCEPTIONS, message?: string) {
    super(message);
    this.type = type;
  }
}
