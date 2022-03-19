import EasyTriviaUtil from "./EasyTriviaUtil";

class EasyTriviaError extends Error {
  public static readonly errors = {
    headers: {
      EMPTY_RESPONSE: "EMPTY_RESPONSE",
      FAILED_REQUEST: "FAILED_REQUEST",
      INVALID_ARG: "INVALID_ARGUMENT",
      INVALID_CONSTRUCTOR_ARG: "INVALID_CONSTRUCTOR_ARGUMENT",
      INVALID_ID: "INVALID_ID",
      INVALID_NAME: "INVALID_CATEGORY_NAME",
      INVALID_OPT: "INVALID_OPTION",
      MISSING_OPT: "MISSING_OPTION",
      MISSING_ARG: "MISSING_ARGUMENT",
    },
  };

  constructor(message: string, header: string) {
    if (typeof message != "string")
      throw new EasyTriviaError(
        `Expected a string for 'message', recieved ${typeof message}`,
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    if (typeof header != "string")
      throw new EasyTriviaError(
        `Expected a string for 'header', recieved ${typeof header}`,
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    if (!message.length || !header.length)
      throw new EasyTriviaError(
        `Supplied strings must not be empty`,
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );

    super(message);
    this.name = `EasyTriviaError [${header}]`;
  }
}

class OpenTDBError extends Error {
  constructor(errorCode: number) {
    if (errorCode < 0 || errorCode > 4)
      throw new EasyTriviaError(
        `The given number (${errorCode}) for 'errorCode' is not a valid ResponseCode (range 0 - 4)`,
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    const { name, message } = EasyTriviaUtil.apiResponses[errorCode];

    super(message);
    this.name = `OpenTDBError [${name}]`;
  }
}

export { EasyTriviaError, OpenTDBError };
