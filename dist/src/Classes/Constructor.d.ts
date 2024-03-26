import type { CategoryData, Question, RawCategoryResponse, RawQuestion } from "../Typings/interfaces";
/**
 * @class Class for transforming raw API data to developer friendly data.
 * @private
 */
export default class Constructor {
    /**
     * Parses a raw category to be more JavaScript friendly and less verbose.
     * @param {RawCategoryResponse} rawCategoryData The raw category.
     * @returns {CategoryData}
     */
    static category(rawCategoryData: RawCategoryResponse): CategoryData;
    /**
     * Parses each object in a raw question array to be more JavaScript friendly.
     * @param {RawQuestion[]} rawQuestions An array of raw questions.
     * @returns {Question<unknown>[]}
     */
    static questions(rawQuestions: RawQuestion[]): Question<unknown>[];
}
