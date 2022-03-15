declare class EasyTriviaError extends Error {
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
declare class OpenTriviaDBError extends Error {
    constructor(errorCode: number);
}
export { EasyTriviaError, OpenTriviaDBError };
