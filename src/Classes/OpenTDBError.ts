import type { ErrorResponse } from "../typings/interface";

export default class OpenTDBError extends TypeError {
  constructor(error:ErrorResponse) {
    super(error.text);
    this.name = `OpenTDBError [${error.header}]`;
  }
}