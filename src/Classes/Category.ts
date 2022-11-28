import { CategoryNames } from "../typings/enums";
import type { CategoryNameType } from "../typings/types";
import getCategory from "../functions/getCategory";
import Util from "./Util";

/**
 * @class Class for anything trivia category related.
 */
export default class Category {
  /**
   * An array of all category names. Use `Category.random()` for a random pick.
   */
  static allNames: CategoryNameType[] = Object.keys(CategoryNames).filter(
    (key) => isNaN(+key)
  ) as CategoryNameType[];

  /**
   * Decodes a URLLegacy, URL3968 or Base64 category name.
   * @param {string} str string to decode.
   * @returns {string} The decoded category name.
   */
  static decodeEncodedCategoryName(str: string): CategoryNameType | null {
    return (
      [
        Util.decodeBase64<CategoryNameType>(str),
        Util.decodeUrl3968<CategoryNameType>(str),
        Util.decodeUrlLegacy<CategoryNameType>(str),
      ].find((str) => Category.allNames.includes(str)) || null
    );
  }

  /**
   * Fetches a trivia category's data. Duplicate of `getCategory()`.
   * @param {CategoryResolvable} arg An argument resolving to a trivia category.
   * @returns {Promise<CategoryData>} The data of the category.
   */
  static getCategory = getCategory;

  /**
   * Returns a category id when given it's name.
   * @param {CategoryNameType} name The name of the category.
   * @returns {number | null} The id if resolvable.
   */
  static idByName(name: CategoryNameType): number | null {
    const id = Category.allNames.indexOf(name);
    return id > -1 ? id + 9 : null;
  }

  /**
   * Returns a category name when given it's id.
   * @param {number} id The id of the category.
   * @returns {CategoryNameType | null} The name if resolvable.
   */
  static nameById(id: number): CategoryNameType | null {
    const name = Category.allNames[id - 9];
    return name !== undefined ? (name as CategoryNameType) : null;
  }

  /**
   * Picks a random category name or id.
   * @param {'name' | 'id'} resolvableType The kind of resolvable to return (default `'name'`).
   * @returns {CategoryNameType | number} A random category id or name.
   */
  static random(resolvableType: "name"): CategoryNameType;
  static random(resolvableType: "id"): number;
  static random(resolvableType?: "name" | "id"): CategoryNameType | number {
    if (resolvableType === undefined) resolvableType = "name";

    const name =
      Category.allNames[Math.floor(Math.random() * Category.allNames.length)];
    if (resolvableType === "id") return Category.idByName(name)!;
    return name;
  }
}
