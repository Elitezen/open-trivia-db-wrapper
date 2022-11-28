import type { ErrorResponse } from "../typings/interfaces";
import type { ErrorCode, ExtendedDictionary } from "../typings/types";
/**
 * @class Class for utility functions.
 * @private
 */
export default class Util {
    static assignDefaults<T extends object>(defaults: T, current?: T | {}): T & ({} | T);
    static base64Decoder: {
        atob(str: string): string;
        decode<T>(value: unknown): T;
        decodeString<T_1 extends string>(str: string): T_1;
        decodeStringArray(arr: string[]): unknown[];
        decodeObjectValues(obj: object): any;
    };
    static decodeBase64: <T extends string>(str: string) => T;
    static decodeUrlLegacy<T extends string>(str: string): T;
    static decodeUrl3968<T extends string>(str: string): T;
    static createQueriedLink(baseURL: string, options: ExtendedDictionary<null>, concatSymbol?: string): string;
    static fetch<T>(url: string, checkForResponseCode?: boolean): Promise<T>;
    static getErrorByCode(code: ErrorCode): ErrorResponse;
    static shuffleArray<T>(arg: T[]): T[];
}
