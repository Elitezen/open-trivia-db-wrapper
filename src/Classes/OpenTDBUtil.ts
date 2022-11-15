import { QuestionDifficulties, QuestionEncodings, QuestionTypes } from "../Typings/enums";
import { Question, QuestionOptions, RawQuestion } from "../Typings/interfaces";
import {
  OpenTDBResponseCode,
  QuestionDifficulty,
  QuestionEncoding,
  QuestionType,
} from "../Typings/types";
import { OpenTDBError, OpenTDBResponse } from "./CustomErrors";
import Validator from "./Validator";

export default class OpenTDBUtil {
  public static apiResponses = [
    { name: "SUCCESS", message: "Successful response" },
    {
      name: "NO_RESULTS",
      message:
        "Could not return results. The API does not have enough questions for your query",
    },
    { name: "INVALID_PARAMETER", message: "An invalid parameter was received" },
    {
      name: "TOKEN_NOT_FOUND",
      message: "The given API token is invalid or does not exist",
    },
    {
      name: "TOKEN_EMPTY",
      message:
        "This trivia session has returned all possible questions for the specified query",
    },
  ];

  public static links = {
    base: {
      CATEGORY_DATA: "https://opentdb.com/api_count.php?category=",
      GET_QUESTIONS: "https://opentdb.com/api.php?",
      RESET_SESSION: "https://opentdb.com/api_token.php?command=reset&token=",
    },
    full: {
      START_SESSION: "https://opentdb.com/api_token.php?command=request",
      OVR_QUESTION_CNT: "https://opentdb.com/api_count_global.php",
    },
  };

  public static questionDifficulties: QuestionDifficulties[] = [
    QuestionDifficulties.Easy,
    QuestionDifficulties.Medium,
    QuestionDifficulties.Hard,
  ];
  public static questionEncodings: QuestionEncodings[] = [
    QuestionEncodings.UrlLegacy,
    QuestionEncodings.Url3986,
    QuestionEncodings.Base64,
    QuestionEncodings.None
  ];

  public static questionTypes: QuestionTypes[] = [
    QuestionTypes.Boolean,
    QuestionTypes.Multiple
  ];

  public static openTDBRequest(url: string) {
    if (url === undefined)
      throw new OpenTDBError(
        "'url' argument is required, received undefined",
        "missing_argument"
      );
    if (typeof url != "string")
      throw new OpenTDBError(
        `'url' argument must be of type string, received ${typeof url}`,
        "invalid_argument"
      );

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(req => req.json())
        .then(data => {
          const responseCode = (data?.response_code?.toString?.() ||
            null) as OpenTDBResponseCode | null;
          if (responseCode) {
            if (responseCode > 0) throw new OpenTDBResponse(responseCode);
          }

          resolve(data);
        });
    });
  }

  public static shuffleArray<T>(arg: T[]): T[] {
    if (!Array.isArray(arg)) throw new TypeError("Argument must be an array");
    // Fisher–Yates shuffle: https://bost.ocks.org/mike/shuffle/
    // TypeScript Adjusted

    let m = arg.length,
      t: T,
      i: number;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = arg[m];
      arg[m] = arg[i];
      arg[i] = t;
    }

    return arg;
  }

  public static base64Decoder = {
    atob(str: string) {
      return Buffer.from(str, "base64").toString();
    },
    decode(value: unknown): unknown {
      return value == null ||
        value == undefined ||
        typeof value == "boolean" ||
        typeof value == "number"
        ? value
        : typeof value == "string"
          ? this.decodeString(value)
          : typeof value == "object" && !Array.isArray(value)
            ? this.decodeObjectValues(value as object)
            : Array.isArray(value)
              ? this.decodeStringArray(value)
              : value;
    },
    decodeString(str: string) {
      return this.atob(str);
    },
    decodeStringArray(arr: string[]) {
      return arr.map((v) => this.decode(v));
    },
    decodeObjectValues(obj: object) {
      const o = new Object().constructor();
      Object.entries(obj).forEach(
        ([key, value]) => (o[key] = this.decode(value))
      );
      return o;
    },
  };

  public static finalizeOptions(options: QuestionOptions): QuestionOptions {
    const validator = new Validator(options);
    const { encode: targetEncode } = options;
    const verifiedOptions: QuestionOptions = {
      amount: validator.checkAmount(),
      difficulty: validator.checkDifficulty(),
      type: validator.checkType(),
      category: validator.checkCategory(),
      session: validator.checkToken(),
      encode: targetEncode == QuestionEncodings.None ? QuestionEncodings.Base64 : validator.checkEncode(),
    };

    return verifiedOptions;
  }

  public static generateQueryString(baseLink: string, obj: object): string {
    let queryArgs: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined)
        queryArgs.push(`${key}=${value}`);
    }

    return baseLink + queryArgs.join("&");
  }

  public static parseRawQuestions(questions: RawQuestion[]): Question[] {
    const result = questions.map((q) => {
      const parsedQuestion: Readonly<Question> = {
        value: q.question,
        category: q.category,
        type: q.type,
        difficulty: q.difficulty,
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers,
        allAnswers: OpenTDBUtil.shuffleArray([
          q.correct_answer,
          ...q.incorrect_answers,
        ]),
        checkAnswer: (arg: string) => {
          return (
            arg?.toLowerCase?.() ==
            this.base64Decoder.atob(q.correct_answer).toLowerCase() ||
            arg?.toLowerCase?.() == q.correct_answer
          );
        },
      };

      return parsedQuestion;
    });

    return result;
  }
}
