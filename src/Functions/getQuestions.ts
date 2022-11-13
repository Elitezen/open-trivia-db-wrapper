import {
  OpenTDBResponseDefault,
  Question,
  QuestionOptions,
  RawQuestion,
} from "../Typings/interfaces";
import { QuestionEncodings } from "../Typings/enums";
import OpenTDBUtil from "../Classes/OpenTDBUtil";
import { QuestionOptionsDefaults } from "../Typings/types";
import Category from "../Classes/Category";
import Session from "../Classes/Session";

/**
 * Fetches an array of questions based on provided options.
 * @param {QuestionOptions} options - The metadeta describing target questions.
 * @param {string | number} options.amount The amount of questions to fetch (min. 1, max. 50)
 * @param {?CategoryResolvable} options.category The category of questions.
 * @param {?QuestionDifficulty} options.difficulty The difficulty of questions.
 * @param {?QuestionEncoding} [options.encode='none'] The encoding of question values.
 * @param {?string} options.session The Session instance or API session token.
 * @returns {Promise<Question[]>} An Array of questions.
 * @example
 * const questions = await getQuestions({
    amount: 50,
    difficulty: 'easy',
    type: 'multiple',
    category: Category.allNames.SCIENCE_COMPUTERS
  });
 */
export default async function getQuestions(
  options?: QuestionOptions
): Promise<Question[]> {
  const link = OpenTDBUtil.links.base.GET_QUESTIONS;
  const defaultOptions: QuestionOptionsDefaults = {
    amount: 10,
    encode: QuestionEncodings.None,
  };

  if (options?.category instanceof Category)
    options.category = options.category.id;
  if (options?.session instanceof Session) {
    if (options.session.token === null)
      process.emitWarning(
        "Provided Session has a null token. Use Session.start() to start an API session"
      );
    options.session = options.session.token;
  }

  const filledOptions = Object.assign(defaultOptions, options);
  const targetEncode = filledOptions.encode;

  const finalOptions = OpenTDBUtil.finalizeOptions(filledOptions);
  const finalLink = OpenTDBUtil.generateQueryString(link, finalOptions);
  const data = (await OpenTDBUtil.openTDBRequest(
    finalLink
  )) as OpenTDBResponseDefault<RawQuestion>;

  let questions: Question[] = OpenTDBUtil.parseRawQuestions(data.results);
  if (targetEncode == "none" && finalOptions.encode == "base64") {
    questions = questions.map((q) =>
      OpenTDBUtil.base64Decoder.decodeObjectValues(q)
    );
  }

  return questions;
}
