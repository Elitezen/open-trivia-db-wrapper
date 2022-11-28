import Constructor from "../classes/Constructor";
import OpenTDBError from "../classes/OpenTDBError";
import Util from "../classes/Util";
import { Routes } from "../typings/enums";
import type {
  ErrorResponse,
  Question,
  QuestionOptions,
  RawQuestion,
  RawQuestionResponse,
} from "../typings/interfaces";

/**
 *
 * @param {Partial<QuestionOptions>} options
 * @param {?number} options.amount The amount of questions to fetch (min. 1, max. 50)
 * @param {?CategoryResolvable} options.category The category of questions.
 * @param {?QuestionDifficultyType | QuestionDifficulties} options.difficulty The difficulty of questions.
 * @param {?QuestionEncodingType | QuestionEncodings} [options.encode='none'] The encoding of question values.
 * @param {?Session | string | null} options.session The Session instance or API session token.
 * @returns {Promise<Question[]>} An Array of questions.
 */
export default async function getQuestions(
  options?: Partial<QuestionOptions>
): Promise<Question[]> {
  let filledOptions: Partial<
    Pick<QuestionOptions, "amount" | "encode"> & { token?: string | null }
  > = {};
  const optionDefaults: Pick<QuestionOptions, "amount" | "encode"> = {
    amount: 10,
    encode: "none",
  };

  const session = options?.session;
  delete options?.session;
  filledOptions = Util.assignDefaults(optionDefaults, options);
  const noEncoding = options?.encode === undefined || options.encode === "none";

  if (noEncoding) filledOptions.encode = "base64";
  if (session) {
    if (typeof session === "string") {
      filledOptions.token = session;
    } else {
      session.assert();
      filledOptions.token = session.token;
    }
  }

  const url = Util.createQueriedLink(Routes.Questions, filledOptions);

  try {
    const request = await Util.fetch<RawQuestionResponse>(url, true);
    let rawQuestions = request.results;
    let parsedQuestions: RawQuestion[] = [];

    if (noEncoding && filledOptions.encode === "base64") {
      parsedQuestions = Util.base64Decoder.decode<RawQuestion[]>(rawQuestions);
    }

    const suppliedData = !noEncoding ? rawQuestions : parsedQuestions;

    return Constructor.questions([...suppliedData]);
  } catch (err) {
    throw new OpenTDBError(err as ErrorResponse);
  }
}
