import { CategoryData } from "../Typings/interfaces";
import { CategoryResolvable } from "../Typings/types";
/**
 * Fetches a trivia category's data.
 * @param {CategoryResolvable} arg An argument resolving to a trivia category.
 * @returns {Promise<CategoryData>} The data of the category.
 */
export default function getCategoryData(arg: CategoryResolvable): Promise<CategoryData>;
