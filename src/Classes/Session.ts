import { Routes } from "../typings/enums";
import type { ErrorResponse, RawSessionStartResponse } from "../typings/interface";
import OpenTDBError from "./OpenTDBError";
import Util from "./Util";

export default class Session {
  token: string | null;

  constructor() {
    this.token = null;
  }

  assert() {
    if (this.token === null) {
      process.emitWarning(
        "This session currently has no token. Use Session.start() and resolve the promise before using."
      );
    }
  }

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

  async reset() {
    try {
      if (this.token === null) return;

      const url = Util.createQueriedLink(Routes.SessionReset, {
        command: "reset",
        token: this.token,
      });

      const request = await Util.fetch<RawSessionStartResponse>(url);
      this.token = request.token;
      return this.token;
    } catch (err) {
      throw new OpenTDBError(err as ErrorResponse);
    }
  }
}
