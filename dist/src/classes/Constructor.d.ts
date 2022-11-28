import type { CategoryData, Question, RawCategoryResponse, RawQuestion } from "../typings/interfaces";
/**
 * @class Class for transforming raw API data to developer friendly data.
 * @private
 */
export default class Constructor {
    static category(rawCategoryData: RawCategoryResponse): CategoryData;
    static questions(rawQuestions: RawQuestion[]): Question[];
}
