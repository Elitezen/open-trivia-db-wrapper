const apiResponses = [
  { name: 'SUCCESS', message: 'Successful response' },
  { name: 'NO_RESULTS', message: 'Could not return results. The API does not have enough questions for your query' },
  { name: 'INVALID_PARAMETER', message: 'An invalid argument was given' },
  { name: 'TOKEN_NOT_FOUND', message: 'The given API token does not exist' },
  { name: 'TOKEN_EMPTY', message: 'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.' }
];

class EasyTriviaError extends Error {
  constructor(message, header) {
    if (typeof message != 'string') throw new EasyTriviaError(`Expected a string, recieved ${typeof message}`, 'invalid_constructor_argument');
    if (typeof header != 'string') throw new EasyTriviaError(`Expected a string, recieved ${typeof header}`, 'invalid_constructor_argument');

    super(message);
    this.name = `EasyTriviaError [${header.toUpperCase()}]`;
  }
}

class EasyTriviaResponseError extends Error {
  constructor(errorCode) {
    if (errorCode < 0 || errorCode > 4) throw new EasyTriviaError(`Number (${errorCode}) is not a valid ResponseCode (range 0 - 4)`, 'invalid_constructorargument');
    const { name, message } = apiResponses[errorCode];

    super(message);
    this.name = `EasyTriviaResponseError [${name}]`;
  }
}

module.exports = {
  EasyTriviaError,
  EasyTriviaResponseError
}