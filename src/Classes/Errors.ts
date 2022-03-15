const apiResponses = [
  { "name": "SUCCESS", "message": "Successful response" },
  {
    "name": "NO_RESULTS",
    "message":
      "Could not return results. The API does not have enough questions for your query"
  },
  { "name": "INVALID_PARAMETER", "message": "An invalid parameter was received" },
  {
    "name": "TOKEN_NOT_FOUND",
    "message": "The given API token is invalid or does not exist"
  },
  {
    "name": "TOKEN_EMPTY",
    "message":
      "This trivia session has returned all possible questions for the specified query"
  }
];

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
      MISSING_ARG: "MISSING_ARGUMENT"
    }
  };

  constructor(message:string, header:string) {
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

    super(message);
    this.name = `EasyTriviaError [${header}]`;
  }
}

class OpenTriviaDBError extends Error {
  constructor(errorCode:number) {
    if (errorCode < 0 || errorCode > 4)
      throw new EasyTriviaError(
        `The given number (${errorCode}) for 'errorCode' is not a valid ResponseCode (range 0 - 4)`,
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    const { name, message } = apiResponses[errorCode];

    super(message);
    this.name = `OpenTriviaDBError [${name}]`;
  }
}

export {
  EasyTriviaError,
  OpenTriviaDBError
}