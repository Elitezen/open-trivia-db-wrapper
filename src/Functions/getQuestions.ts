import Validator from "../Classes/Validator";
import { Question, QuestionOptions } from "../Typings/interfaces";
import { QuestionEncodings } from "../Typings/enums";

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
export default function getQuestions(
  options: QuestionOptions
) /*:Promise<Question[]>*/ {
  const defaultOptions: QuestionOptions = {
    amount: 10,
    encode: QuestionEncodings.none,
  };

  options = Object.assign(defaultOptions, options);

  const validator = new Validator(options);
  const { encode: targetEncode } = options;
  // const verifiedOptions:QuestionOptions = {
  //   amount: validator.checkAmount(),
  //   category: validator.checkCategory(),
  //   difficulty: validator.checkDifficulty(),
  //   type: validator.checkType(),
  //   encode: validator.checkEncode(),
  //   token: validator.checkToken(),
  // };
}
