import Category from "../Classes/Category";
import Constructor from "../Classes/Constructor";
import OpenTDBError from "../Classes/OpenTDBError";
import Util from "../Classes/Util";
import { Routes } from "../Typings/enums";
import type {
  CategoryData,
  ErrorResponse,
  RawCategoryResponse,
} from "../Typings/interfaces";
import type { CategoryResolvable } from "../Typings/types";

/**
 * Fetches a trivia category's data. Duplicate of `Category.getCategory()`.
 * @param {CategoryResolvable} arg An argument resolving to a trivia category.
 * @returns {Promise<CategoryData>} The data of the category.
 */
export default async function getCategory(
  arg: CategoryResolvable
): Promise<CategoryData> {
  let resolvable: CategoryResolvable | null = arg;
  if (typeof arg === "string") {
    resolvable = Category.idByName(arg);
  }

  if (resolvable === null || arg < 9 || arg > 32)
    throw new TypeError(
      `Argument (${arg}) does not resolve into a valid OpenTDB category`
    );
  const url = Util.createQueriedLink(Routes.Category, {
    category: resolvable,
  });

  try {
    const request = await Util.fetch<RawCategoryResponse>(url);
    return Constructor.category(request);
  } catch (err) {
    throw new OpenTDBError(err as ErrorResponse);
  }
}
