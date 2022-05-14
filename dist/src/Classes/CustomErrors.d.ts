import { OpenTDBResponseCode } from "../Typings/types";
/**
 * @class Error class for library errors.
 * @extends TypeError
 */
declare class OpenTDBError extends TypeError {
    static readonly errors: {
        headers: {
            EMPTY_RESPONSE: string;
            FAILED_REQUEST: string;
            INVALID_ARG: string;
            INVALID_CONSTRUCTOR_ARG: string;
            INVALID_ID: string;
            INVALID_NAME: string;
            INVALID_OPT: string;
            MISSING_OPT: string;
            MISSING_ARG: string;
        };
    };
    constructor(message: string, header: string);
}
/**
 * @class Error class for OpenTDB API response errors.
 * @extends Error
 */
declare class OpenTDBResponse extends Error {
    constructor(errorCode: OpenTDBResponseCode);
}
export { OpenTDBError, OpenTDBResponse };
