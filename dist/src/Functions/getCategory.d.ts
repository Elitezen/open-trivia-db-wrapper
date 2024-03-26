import type { CategoryData } from "../Typings/interfaces";
import type { CategoryResolvable } from "../Typings/types";
/**
 * Fetches a trivia category's data. Duplicate of `Category.getCategory()`.
 * @param {CategoryResolvable} arg An argument resolving to a trivia category.
 * @returns {Promise<CategoryData>} The data of the category.
 */
export default function getCategory(arg: CategoryResolvable): Promise<CategoryData>;
