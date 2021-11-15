const { _request } = require('../functions/private');

class TriviaSession {
  token = null;

  async start() {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const oldToken = this.token;

    try {
      const data = await _request(url);
      const { token:newToken } = data;
      if (newToken === null || oldToken == newToken) {
        const { EasyTriviaError } = require('../classes/Errors');
        throw new EasyTriviaError('Trivia Session Token failed to update', 'failed_request');
      } else {
        this.token = newToken;
        return this.token;
      }
    } catch (err) {
      throw err;
    }
  }

  async reset() {
    const url = 'https://opentdb.com/api_token.php?command=reset&token=' + this.token;

    try {
      const data = await _request(link);
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
  TriviaSession
}