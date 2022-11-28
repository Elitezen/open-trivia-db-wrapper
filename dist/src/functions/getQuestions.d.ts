import type { Question, QuestionOptions } from "../typings/interfaces";
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
export default function getQuestions(options?: Partial<QuestionOptions>): Promise<Question[]>;
