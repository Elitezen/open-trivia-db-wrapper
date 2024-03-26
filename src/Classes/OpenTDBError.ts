import type { ErrorResponse } from "../Typings/interfaces";

/**
 * @class OpenTDB error constructor
 * @private
 */
export default class OpenTDBError extends TypeError {
  /**
   * @param {ErrorResponse} error A basic header-text error object.
   */
  constructor(error?: ErrorResponse) {
    super(error?.text || "An unhandled error occured");
    this.name = `OpenTDBError [${error?.header || "UNKNOWN_EXCEPTION_THROWN"}]`;
  }
}
