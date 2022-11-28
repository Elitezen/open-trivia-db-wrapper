import type { CategoryNameType } from "../typings/types";
import getCategory from "../functions/getCategory";
/**
 * @class Class for anything trivia category related.
 */
export default class Category {
    /**
     * An array of all category names. Use `Category.random()` for a random pick.
     */
    static allNames: CategoryNameType[];
    /**
     * Decodes a URLLegacy, URL3968 or Base64 category name.
     * @param {string} str string to decode.
     * @returns {string} The decoded category name.
     */
    static decodeEncodedCategoryName(str: string): CategoryNameType | null;
    /**
     * Fetches a trivia category's data. Duplicate of `getCategory()`.
     * @param {CategoryResolvable} arg An argument resolving to a trivia category.
     * @returns {Promise<CategoryData>} The data of the category.
     */
    static getCategory: typeof getCategory;
    /**
     * Returns a category id when given it's name.
     * @param {CategoryNameType} name The name of the category.
     * @returns {number | null} The id if resolvable.
     */
    static idByName(name: CategoryNameType): number | null;
    /**
     * Returns a category name when given it's id.
     * @param {number} id The id of the category.
     * @returns {CategoryNameType | null} The name if resolvable.
     */
    static nameById(id: number): CategoryNameType | null;
    /**
     * Picks a random category name or id.
     * @param {'name' | 'id'} resolvableType The kind of resolvable to return (default `'name'`).
     * @returns {CategoryNameType | number} A random category id or name.
     */
    static random(resolvableType: "name"): CategoryNameType;
    static random(resolvableType: "id"): number;
}
