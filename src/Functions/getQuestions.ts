import { OpenTDBResponse, Question, QuestionOptions, RawQuestion } from "../Typings/interfaces";
import { QuestionEncodings } from "../Typings/enums";
import EasyTriviaUtil from "../classes/EasyTriviaUtil";
import { QuestionOptionsDefaults } from "../Typings/types";

const { finalizeOptions, generateQueryString, openTDBRequest, parseRawQuestions, base64Decoder } = EasyTriviaUtil;

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
):Promise<Question[]> {
  const link = EasyTriviaUtil.links.base.GET_QUESTIONS;
  const defaultOptions:QuestionOptionsDefaults = {
    amount: 10,
    encode: QuestionEncodings.none,
  };

  const filledOptions = Object.assign(defaultOptions, options)
  const targetEncode = filledOptions.encode;
  
  const finalOptions = finalizeOptions(filledOptions);
  const finalLink = generateQueryString(link, finalOptions);
  const data = await openTDBRequest(finalLink) as OpenTDBResponse<RawQuestion>;

  let questions: Question[] = parseRawQuestions(data.results);
  if (targetEncode == "none" && finalOptions.encode == "base64") {
    questions = questions.map((q) => base64Decoder.decodeObjectValues(q));
  }

  return questions;
}