import { QuestionAmountRange, QuestionDifficulties } from "../Typings/enums";
import { QuestionOptions } from "../Typings/interfaces";
import {
  QuestionDifficulty,
  QuestionEncoding,
  QuestionType,
} from "../Typings/types";
import Category from "./Category";
import { OpenTDBError } from "./CustomErrors";

export default class Validator {
  private readonly options: QuestionOptions;

  constructor(options: QuestionOptions) {
    this.options = options;
  }

  // checkOptions() {
  //   try {
  //     this.checkAmount();
  //     this.checkCategory();
  //     this.checkDifficulty();
  //     this.checkEncode();
  //     this.checkOptions();
  //     this.checkToken();
  //     this.checkType();

  //     return this.options;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  checkAmount(): number | null {
    const { amount } = this.options;

    if (amount === undefined || amount === null) return null;

    if (typeof amount == "number") {
      if (amount % 1 !== 0)
        throw new OpenTDBError(
          "'amount' option for QuestionOptions must be a whole integer",
          OpenTDBError.errors.headers.INVALID_OPT
        );
      else if (
        amount < QuestionAmountRange.Min ||
        amount > QuestionAmountRange.Max
      )
        throw new OpenTDBError(
          `'amount' option for QuestionOptions must be from ${QuestionAmountRange.Min} to ${QuestionAmountRange.Max}`,
          OpenTDBError.errors.headers.INVALID_OPT
        );
      else return amount;
    } else if (typeof amount == "string") {
      if (isNaN(+amount))
        throw new OpenTDBError(
          "'amount' option for QuestionOptions must be of type number or string number",
          OpenTDBError.errors.headers.INVALID_OPT
        );
      else if (
        +amount < QuestionAmountRange.Min ||
        +amount > QuestionAmountRange.Max
      )
        throw new OpenTDBError(
          `'amount' option for QuestionOptions must from ${QuestionAmountRange.Min} to ${QuestionAmountRange.Max}`,
          OpenTDBError.errors.headers.INVALID_OPT
        );
      else return parseInt(amount);
    } else {
      throw new OpenTDBError(
        `'amount' option for QuestionOptions must be of type number or string number, received ${typeof amount}`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }
  }

  checkCategory(): number | null {
    const { category } = this.options;

    if (category === undefined || category === null) return null;
    if (typeof category == "string") {
      if (isNaN(+category)) {
        const id = Category.nameToId(category as string);

        if (id === null) {
          throw new OpenTDBError(
            `'category' option (${category}) for QuestionOptions does not resolve into a trivia category name`,
            OpenTDBError.errors.headers.INVALID_OPT
          );
        }

        return id;
      } else {
        if (!Category.isIdResolvable(+category)) {
          throw new OpenTDBError(
            `'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`,
            OpenTDBError.errors.headers.INVALID_OPT
          );
        }

        return parseInt(category);
      }
    } else if (typeof category == "number") {
      if (!Category.isIdResolvable(+category)) {
        throw new OpenTDBError(
          `'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`,
          OpenTDBError.errors.headers.INVALID_OPT
        );
      }

      return category;
    } else {
      throw new OpenTDBError(
        `'category' option ("${category}") for QuestionOptions does not resolve into a trivia category name`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }
  }

  checkDifficulty(): QuestionDifficulty | null {
    const { difficulty } = this.options;

    if (difficulty === undefined || difficulty === null) return null;
    if (typeof difficulty != "string") {
      throw new OpenTDBError(
        `'difficulty' option for QuestionOptions must be of type string, received ${typeof difficulty}`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    const values: QuestionDifficulty[] = ["easy", "medium", "hard"];
    if (!values.includes(difficulty)) {
      throw new OpenTDBError(
        `'difficulty' option ("${difficulty}") for QuestionOptions does not resolve into a question difficulty`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    return difficulty;
  }

  checkEncode() {
    const { encode } = this.options;

    if (encode === undefined || encode === null) return null;
    if (typeof encode != "string") {
      throw new OpenTDBError(
        `'encode' option for QuestionOptions must be of type string, received ${typeof encode}`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    const values: QuestionEncoding[] = [
      "base64",
      "none",
      "url3986",
      "urlLegacy",
    ];
    if (!values.includes(encode)) {
      throw new OpenTDBError(
        `'encode' option ("${encode}") for QuestionOptions does not resolve into a question encode`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    return encode;
  }

  checkToken(): string | null {
    const { session: token } = this.options;
    if (token === undefined || token === null) return null;

    if (typeof token != "string") {
      throw new OpenTDBError(
        `'session' option for QuestionOptions must be of type string or session`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    } else if (!token.length) {
      throw new OpenTDBError(
        `'session' option for QuestionOptions must not be an empty string`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    return token;
  }

  checkType() {
    const { type } = this.options;

    if (type === undefined || type === null) return null;
    if (typeof type != "string") {
      throw new OpenTDBError(
        `'type' option for QuestionOptions must be of type string, received ${typeof type}`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    const values: QuestionType[] = ["boolean", "multiple"];
    if (!values.includes(type)) {
      throw new OpenTDBError(
        `'type' option ("${type}") for QuestionOptions does not resolve into a question type`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }

    return type;
  }

  static _checkCategory(category: unknown) {
    if (category === undefined || category === null) return null;
    if (typeof category == "string") {
      if (isNaN(+category)) {
        const id = Category.nameToId(category as string);

        if (id === null) {
          throw new OpenTDBError(
            `'category' option (${category}) for QuestionOptions does not resolve into a trivia category name`,
            OpenTDBError.errors.headers.INVALID_OPT
          );
        }

        return id;
      } else {
        if (!Category.isIdResolvable(+category)) {
          throw new OpenTDBError(
            `'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`,
            OpenTDBError.errors.headers.INVALID_OPT
          );
        }

        return parseInt(category);
      }
    } else if (typeof category == "number") {
      if (!Category.isIdResolvable(+category)) {
        throw new OpenTDBError(
          `'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`,
          OpenTDBError.errors.headers.INVALID_OPT
        );
      }

      return category;
    } else {
      throw new OpenTDBError(
        `'category' option ("${category}") for QuestionOptions does not resolve into a trivia category name`,
        OpenTDBError.errors.headers.INVALID_OPT
      );
    }
  }
}
