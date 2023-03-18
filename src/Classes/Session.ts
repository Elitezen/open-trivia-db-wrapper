import { Routes } from "../Typings/enums";
import type {
  ErrorResponse,
  RawSessionStartResponse,
} from "../Typings/interfaces";
import OpenTDBError from "./OpenTDBError";
import Util from "./Util";

/**
 * @class Class for working with trivia API sessions.
 */
export default class Session {
  /**
   * This session's current token
   */
  token: string | null;

  constructor(token?: string) {
    this.token = token || null;
  }

  /**
   * Checks if the session has been initialized or holds a token. Emits a warning if not.
   */
  assert() {
    if (this.token === null) {
      process.emitWarning(
        "This session currently has no token. Use Session.start() and resolve the promise before using."
      );
    }
  }

  /**
   * Generates a session token and assigns it to the instance (`Session.token`).
   */
  async start() {
    try {
      const request = await Util.fetch<RawSessionStartResponse>(
        Routes.SessionStart
      );
      this.token = request.token;
      return this.token;
    } catch (err) {
      throw new OpenTDBError(err as ErrorResponse);
    }
  }

  /**
   * Resets the current session's data.
   */
  async reset() {
    try {
      if (this.token === null) return;

      const url = Util.createQueriedLink(Routes.SessionReset, {
        command: "reset",
        token: this.token,
      });

      const request = await Util.fetch<RawSessionStartResponse>(url);
      this.token = request.token;
    } catch (err) {
      throw new OpenTDBError(err as ErrorResponse);
    }
  }
}
