import type { ErrorResponse } from "../Typings/interfaces";
import type { ErrorCode, ExtendedDictionary } from "../Typings/types";
import fetch from "node-fetch";

/**
 * @class Class for utility functions.
 * @private
 */
export default class Util {
  static assignDefaults<T extends object>(defaults: T, current?: T | {}) {
    if (current === undefined) return defaults;

    return Object.assign(defaults, current);
  }

  static base64Decoder = {
    atob(str: string) {
      return Buffer.from(str, "base64").toString();
    },
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
    decodeString<T extends string>(str: string): T {
      return Util.base64Decoder.atob(str) as T;
    },
    decodeStringArray(arr: string[]) {
      return arr.map((v) => Util.base64Decoder.decode(v));
    },
    decodeObjectValues(obj: object) {
      const o = new Object().constructor();
      Object.entries(obj).forEach(
        ([key, value]) => (o[key] = Util.base64Decoder.decode(value))
      );
      return o;
    },
  };

  static decodeBase64 = Util.base64Decoder.decodeString;

  static decodeUrlLegacy<T extends string>(str: string): T {
    return decodeURIComponent(str).split("+").join(" ") as T;
  }

  static decodeUrl3968<T extends string>(str: string): T {
    return decodeURIComponent(str) as T;
  }

  static createQueriedLink(
    baseURL: string,
    options: ExtendedDictionary<null>,
    concatSymbol: string = "&"
  ) {
    const optionsArr = Object.keys(options).map(
      (key) => `${key}=${options[key]}`
    );
    return (baseURL += optionsArr.join(concatSymbol));
  }

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
