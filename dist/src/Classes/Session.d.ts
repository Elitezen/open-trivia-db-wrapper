/// <reference types="node" />
import { EventEmitter } from "stream";
import { OpenTDBResponse } from "./CustomErrors";
interface Session {
    on(eventName: "error", listener: (error: OpenTDBResponse) => unknown): this;
}
/**
 * @class Class for starting OpenTDB API sessions
 * */
declare class Session extends EventEmitter implements Session {
    /**
     * The current session token
     */
    token: string | null;
    /**
     * Starts a new trivia session and assigns the new token to `Session#token`.
     * @async
     * @returns {Promise<string>} The session token.
     */
    start(): Promise<string>;
    /**
     * Resets the current trivia session.
     * @async
     * @returns {Promise<string>} The current session token.
     */
    reset(): Promise<string | void>;
    /** Sets `Session#token` to null */
    end(): void;
}
export default Session;
