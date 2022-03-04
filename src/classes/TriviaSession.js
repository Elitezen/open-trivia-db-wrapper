const { _request } = require("../functions/private");
const { links } = require('../constants/api.json');
const { errors } = require('../constants/library.json');

class TriviaSession {
  token = null;

  async start() {
    const url = links.full.START_SESSION;
    const oldToken = this.token;

    try {
      const data = await _request(url);
      const { token: newToken } = data;
      if (newToken === null || oldToken == newToken) {
        const { EasyTriviaError } = require("../classes/Errors");
        throw new EasyTriviaError(
          "This trivia's session token unexpectedly failed to update",
          errors.headers.FAILED_REQUEST
        );
      } else {
        this.token = newToken;
        return this.token;
      }
    } catch (err) {
      throw err;
    }
  }

  async reset() {
    const url =
      links.base.RESET_SESSION + this.token;

    try {
      const data = await _request(url);
      return data.token;
    } catch (err) {
      throw err;
    }
  }

  end() {
    this.token = null;
  }
}

module.exports = {
  TriviaSession,
};
