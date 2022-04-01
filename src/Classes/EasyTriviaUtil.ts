import { get } from "https";
import { Question, QuestionOptions, RawQuestion } from "../Typings/interfaces";
import {
  OpenTDBResponseCode,
  QuestionDifficulty,
  QuestionEncoding,
  QuestionType,
} from "../Typings/types";
import { EasyTriviaError, OpenTDBResponse } from "./CustomErrors";
import Validator from "./Validator";

export default class EasyTriviaUtil {
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

  public static questionDifficulties: QuestionDifficulty[] = [
    "easy",
    "medium",
    "hard",
  ];
  public static questionEncodings: QuestionEncoding[] = [
    "urlLegacy",
    "url3986",
    "base64",
    "none",
  ];
  public static questionTypes: QuestionType[] = ["multiple", "boolean"];

  public static openTDBRequest(url: string) {
    if (url === undefined)
      throw new EasyTriviaError(
        "'url' argument is required, received undefined",
        "missing_argument"
      );
    if (typeof url != "string")
      throw new EasyTriviaError(
        `'url' argument must be of type string, received ${typeof url}`,
        "invalid_argument"
      );

    return new Promise((resolve, reject) => {
      let data = "";
      const req = get(url, (res) => {
        res.on("data", (chunk) => (data += chunk));
        res.on("error", reject);
        res.on("end", () => {
          if (data.length > 0) {
            try {
              const body = JSON.parse(data);
              const responseCode = (body?.response_code?.toString?.() ||
                null) as OpenTDBResponseCode | null;
              if (responseCode) {
                if (responseCode > 0) throw new OpenTDBResponse(responseCode);
              }

              resolve(body);
            } catch (err) {
              reject(err);
            }
          } else {
            throw new EasyTriviaError(
              "API responded with no data",
              EasyTriviaError.errors.headers.EMPTY_RESPONSE
            );
          }
        });
      });

      req.on("error", reject);
      req.end();
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
      encode: targetEncode == "none" ? "base64" : validator.checkEncode(),
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
        allAnswers: EasyTriviaUtil.shuffleArray([
          q.correct_answer,
          ...q.incorrect_answers,
        ]),
        checkAnswer: (arg: string) => {
          console.log(arg);
          console.log(q.correct_answer);
          console.log(this.base64Decoder.atob(q.correct_answer));
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
