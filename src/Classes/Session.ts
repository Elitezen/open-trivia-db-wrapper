import EventEmitter = require("events");
import { OpenTDBResponseSession } from "../Typings/interfaces";
import EasyTriviaUtil from "./EasyTriviaUtil";

declare interface Session {
  on(event: '...', listener: () => void): this;
}

/** 
 * @class Class for starting OpenTDB API sessions 
 * @extends EventEmitter
 * */
class Session extends EventEmitter implements Session {
  /**
   * The current session token
   */
  public token:string | null = null;

  constructor() {
    super();
  }

  /**
   * Starts a new trivia session and assigns the new token to `Session#token`.
   * @async
   * @returns {Promise<string>} The session token.
   */
  public async start():Promise<string> {
    const url = EasyTriviaUtil.links.full.START_SESSION;
    const oldToken = this.token;

    try {
      const data = await EasyTriviaUtil.openTDBRequest(url) as OpenTDBResponseSession;
      const { token: newToken } = data;
      if (newToken === null || oldToken == newToken) {
        const { EasyTriviaError } = require("../classes/Errors");
        throw new EasyTriviaError(
          "This trivia's session token unexpectedly failed to update",
          EasyTriviaError.errors.headers.FAILED_REQUEST
        );
      } else {
        this.token = newToken;
        return this.token;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Resets the current trivia session.
   * @async
   * @returns {Promise<TriviaSessionToken>} The current session token.
   */
  async reset() {
    const url = EasyTriviaUtil.links.base.RESET_SESSION + this.token;

    try {
      const data = await EasyTriviaUtil.openTDBRequest(url) as OpenTDBResponseSession;
      return data.token;
    } catch (err) {
      throw err;
    }
  }

  /** Sets `TriviaSession#token` to null */
  end() {
    this.token = null;
  }
}

const x = new Session();

export default Session;