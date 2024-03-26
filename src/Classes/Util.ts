import type { ErrorResponse } from "../Typings/interfaces";
import type {
  CategoryNameType,
  ErrorCode,
  ExtendedDictionary,
} from "../Typings/types";
import fetch from "node-fetch";
import Category from "./Category";

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
  static assignDefaults<T extends object>(defaults: T, current?: T | {}): T {
    if (current === undefined) return defaults;

    return Object.assign(defaults, current);
  }

  /**
   * Contains functions for converting Base64 to ASCII
   */
  static base64Decoder = {
    /**
     * Converts a Base64 string to ASCII
     * @param {string} str
     * @returns {string}
     */
    atob(str: string): string {
      return Buffer.from(str, "base64").toString();
    },

    /**
     * Dynamically decodes a variable based on it's type.
     * @param {unknown} value any variable.
     * @returns {T}
     */
    decode<T>(value: unknown): T {
      return value == null ||
        value == undefined ||
        typeof value == "boolean" ||
        typeof value == "number"
        ? value
        : typeof value == "string"
        ? Util.base64Decoder.decodeString(value)
        : typeof value == "object" && !Array.isArray(value)
        ? Util.base64Decoder.decodeObjectValues(value as object)
        : Array.isArray(value)
        ? Util.base64Decoder.decodeStringArray(value)
        : value;
    },

    /**
     * Converts a Base64 string to ASCII.
     * @param {string} str
     * @returns {T}
     */
    decodeString<T extends string>(str: string): T {
      return Util.base64Decoder.atob(str) as T;
    },

    /**
     * Converts the values of an array based on type.
     * @param {string[]} arr
     * @returns {unknown[]}
     */
    decodeStringArray(arr: string[]): unknown[] {
      return arr.map((v) => Util.base64Decoder.decode(v));
    },

    /**
     * Converts the values of an object from Base64 to ASCII.
     * @param {object} obj
     * @returns {any}
     */
    decodeObjectValues(obj: object): any {
      const o = new Object().constructor();
      Object.entries(obj).forEach(
        ([key, value]) => (o[key] = Util.base64Decoder.decode(value))
      );
      return o;
    },
  };

  /**
   * Copy of `Util.base64Decoder.decodeString`.
   */
  static decodeBase64 = Util.base64Decoder.decodeString;

  /**
   * Converts a urlLegacy string to ASCII.
   * @param {string} str
   * @returns {T}
   */
  static decodeUrlLegacy<T extends string>(str: string): T {
    return decodeURIComponent(str).split("+").join(" ") as T;
  }

  /**
   * Converts a url3968 string to ASCII.
   * @param {string} str
   * @returns {T}
   */
  static decodeUrl3968<T extends string>(str: string): T {
    return decodeURIComponent(str) as T;
  }

  /**
   * Builds a URL with queries.
   * @param {string} baseURL The starting URL.
   * @param {ExtendedDictionary<null>} options The request key and values.
   * @param {string} concatSymbol The string symbol that joins each key-value pair.
   * @returns {string}
   */
  static createQueriedLink(
    baseURL: string,
    options: ExtendedDictionary<null>,
    concatSymbol: string = "&"
  ): string {
    const optionsArr = Object.keys(options).map((key) => {
      let value = options[key];
      if (key == "category" && typeof value == "string")
        value = Category.idByName(value as CategoryNameType);

      return `${key}=${value}`;
    });
    return (baseURL += optionsArr.join(concatSymbol));
  }

  /**
   * Fetches data from an OpenTDB URL.
   * @param {string} url
   * @param {boolean} checkForResponseCode Whether to throw an error if a `responseCode` property with a value of `0` is found.
   * @returns {Promise<T>}
   */
  static async fetch<T>(
    url: string,
    checkForResponseCode: boolean = false
  ): Promise<T> {
    const request = await fetch(url);
    const data: any = await request.json();

    if (checkForResponseCode && data?.response_code !== 0) {
      throw Util.getErrorByCode(data.response_code as ErrorCode);
    }

    return data;
  }

  /**
   * Returns the corresponding error data.
   * @param {ErrorCode} code The error code.
   * @returns {ErrorResponse} The error response data.
   */
  static getErrorByCode(code: ErrorCode): ErrorResponse {
    const responses: ErrorResponse[] = [
      {
        header: "No Results",
        text: "Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
      },
      {
        header: "Invalid Parameter",
        text: "Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)",
      },
      {
        header: "Token Not Found",
        text: "Session Token does not exist.",
      },
      {
        header: "Token Empty",
        text: "Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
      },
    ];

    return responses[code - 1];
  }

  /**
   * Shuffles an array. See https://bost.ocks.org/mike/shuffle/.
   * @param {T[]} arg
   * @returns {T[]}
   */
  static shuffleArray<T>(arg: T[]): T[] {
    if (!Array.isArray(arg)) throw new TypeError("Argument must be an array");
    // Fisher–Yates shuffle: https://bost.ocks.org/mike/shuffle/
    // TypeScript Adjusted

    let m = arg.length,
      t: T,
      i: number;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = arg[m];
      arg[m] = arg[i];
      arg[i] = t;
    }

    return arg;
  }
}
