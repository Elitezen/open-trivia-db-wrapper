import { EventEmitter } from "stream";
import { OpenTDBResponseSession } from "../Typings/interfaces";
import { OpenTDBError, OpenTDBResponse } from "./CustomErrors";
import OpenTDBUtil from "./OpenTDBUtil";

interface Session {
  on(eventName: "error", listener: (error: OpenTDBResponse) => unknown): this;
}

/**
 * @class Class for starting OpenTDB API sessions
 * */
class Session extends EventEmitter implements Session {
  /**
   * The current session token
   */
  public token: string | null = null;

  /**
   * Starts a new trivia session and assigns the new token to `Session#token`.
   * @async
   * @returns {Promise<string>} The session token.
   */
  public async start(): Promise<string> {
    const url = OpenTDBUtil.links.full.START_SESSION;
    const oldToken = this.token;

    try {
      const data = (await OpenTDBUtil.openTDBRequest(
        url
      )) as OpenTDBResponseSession;
      const { token: newToken } = data;
      if (newToken === null || oldToken == newToken) {
        throw new OpenTDBError(
          "This trivia's session token unexpectedly failed to update",
          OpenTDBError.errors.headers.FAILED_REQUEST
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
   * @returns {Promise<string>} The current session token.
   */
  async reset(): Promise<string | void> {
    const url = OpenTDBUtil.links.base.RESET_SESSION + this.token;

    try {
      const data = (await OpenTDBUtil.openTDBRequest(
        url
      )) as OpenTDBResponseSession;
      return data.token;
    } catch (err) {
      throw err;
    }
  }

  /** Sets `Session#token` to null */
  end(): void {
    this.token = null;
  }
}

export default Session;

const x = new Session();
