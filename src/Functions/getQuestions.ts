import {
  OpenTDBResponseDefault,
  Question,
  QuestionOptions,
  RawQuestion,
} from "../Typings/interfaces";
import { QuestionEncodings } from "../Typings/enums";
import EasyTriviaUtil from "../classes/EasyTriviaUtil";
import { QuestionOptionsDefaults } from "../Typings/types";

/**
 * Fetches an array of questions based on provided options.
 * @param {QuestionOptions} options - The metadeta describing target questions.
 * @param {string | number} options.amount The amount of questions to fetch (min. 1, max. 50)
 * @param {?CategoryResolvable} options.category The category of questions.
 * @param {?QuestionDifficulty} options.difficulty The difficulty of questions.
 * @param {?QuestionEncoding} [options.encode='none'] The encoding of question values.
 * @param {?string} options.token The session token.
 * @returns {Promise<Question[]>} An Array of questions.
 */
export default async function getQuestions(
  options?: QuestionOptions
): Promise<Question[]> {
  const link = EasyTriviaUtil.links.base.GET_QUESTIONS;
  const defaultOptions: QuestionOptionsDefaults = {
    amount: 10,
    encode: QuestionEncodings.none,
  };

  const filledOptions = Object.assign(defaultOptions, options);
  const targetEncode = filledOptions.encode;

  const finalOptions = EasyTriviaUtil.finalizeOptions(filledOptions);
  const finalLink = EasyTriviaUtil.generateQueryString(link, finalOptions);
  const data = (await EasyTriviaUtil.openTDBRequest(
    finalLink
  )) as OpenTDBResponseDefault<RawQuestion>;

  let questions: Question[] = EasyTriviaUtil.parseRawQuestions(data.results);
  if (targetEncode == "none" && finalOptions.encode == "base64") {
    questions = questions.map((q) =>
      EasyTriviaUtil.base64Decoder.decodeObjectValues(q)
    );
  }

  return questions;
}
