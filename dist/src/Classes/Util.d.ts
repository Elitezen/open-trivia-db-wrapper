import type { ErrorResponse } from "../Typings/interfaces";
import type { ErrorCode, ExtendedDictionary } from "../Typings/types";
/**
 * @class Class for utility functions.
 * @private
 */
export default class Util {
    /**
     * Applies default values to missing keys.
     * @param {T} defaults The default shape of the type.
     * @param {T} current The current object
     * @returns
     */
    static assignDefaults<T extends object>(defaults: T, current?: T | {}): T;
    /**
     * Contains functions for converting Base64 to ASCII
     */
    static base64Decoder: {
        /**
         * Converts a Base64 string to ASCII
         * @param {string} str
         * @returns {string}
         */
        atob(str: string): string;
        /**
         * Dynamically decodes a variable based on it's type.
         * @param {unknown} value any variable.
         * @returns {T}
         */
        decode<T>(value: unknown): T;
        /**
         * Converts a Base64 string to ASCII.
         * @param {string} str
         * @returns {T}
         */
        decodeString<T_1 extends string>(str: string): T_1;
        /**
         * Converts the values of an array based on type.
         * @param {string[]} arr
         * @returns {unknown[]}
         */
        decodeStringArray(arr: string[]): unknown[];
        /**
         * Converts the values of an object from Base64 to ASCII.
         * @param {object} obj
         * @returns {any}
         */
        decodeObjectValues(obj: object): any;
    };
    /**
     * Copy of `Util.base64Decoder.decodeString`.
     */
    static decodeBase64: <T extends string>(str: string) => T;
    /**
     * Converts a urlLegacy string to ASCII.
     * @param {string} str
     * @returns {T}
     */
    static decodeUrlLegacy<T extends string>(str: string): T;
    /**
     * Converts a url3968 string to ASCII.
     * @param {string} str
     * @returns {T}
     */
    static decodeUrl3968<T extends string>(str: string): T;
    /**
     * Builds a URL with queries.
     * @param {string} baseURL The starting URL.
     * @param {ExtendedDictionary<null>} options The request key and values.
     * @param {string} concatSymbol The string symbol that joins each key-value pair.
     * @returns {string}
     */
    static createQueriedLink(baseURL: string, options: ExtendedDictionary<null>, concatSymbol?: string): string;
    /**
     * Fetches data from an OpenTDB URL.
     * @param {string} url
     * @param {boolean} checkForResponseCode Whether to throw an error if a `responseCode` property with a value of `0` is found.
     * @returns {Promise<T>}
     */
    static fetch<T>(url: string, checkForResponseCode?: boolean): Promise<T>;
    /**
     * Returns the corresponding error data.
     * @param {ErrorCode} code The error code.
     * @returns {ErrorResponse} The error response data.
     */
    static getErrorByCode(code: ErrorCode): ErrorResponse;
    /**
     * Shuffles an array. See https://bost.ocks.org/mike/shuffle/.
     * @param {T[]} arg
     * @returns {T[]}
     */
    static shuffleArray<T>(arg: T[]): T[];
}
