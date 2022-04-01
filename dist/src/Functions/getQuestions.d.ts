import { Question, QuestionOptions } from "../Typings/interfaces";
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
export default function getQuestions(options?: QuestionOptions): Promise<Question[]>;
