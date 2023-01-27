/**
 * @class Class for working with trivia API sessions.
 */
export default class Session {
    /**
     * This session's current token
     */
    token: string | null;
    constructor();
    /**
     * Checks if the session has been initialized or holds a token. Emits a warning if not.
     */
    assert(): void;
    /**
     * Generates a session token and assigns it to the instance (`Session.token`).
     */
    start(): Promise<string>;
    /**
     * Resets the current session's data.
     */
    reset(): Promise<void>;
}
