const { apiResponses } = require('../../constants/api.json');
const { errors } = require('../../constants/library.json');

class EasyTriviaError extends Error {
  constructor(message, header) {
    if (typeof message != "string")
      throw new EasyTriviaError(
        `Expected a string for 'message', recieved ${typeof message}`,
        errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    if (typeof header != "string")
      throw new EasyTriviaError(
        `Expected a string for 'header', recieved ${typeof header}`,
        errors.headers.INVALID_CONSTRUCTOR_ARG
      );

    super(message);
    this.name = `EasyTriviaError [${header}]`;
  }
}

class EasyTriviaResponseError extends Error {
  constructor(errorCode) {
    if (errorCode < 0 || errorCode > 4)
      throw new EasyTriviaError(
        `The given number (${errorCode}) for 'errorCode' is not a valid ResponseCode (range 0 - 4)`,
        errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    const { name, message } = apiResponses[errorCode];

    super(message);
    this.name = `EasyTriviaResponseError [${name}]`;
  }
}

module.exports = {
  EasyTriviaError,
  EasyTriviaResponseError,
};
