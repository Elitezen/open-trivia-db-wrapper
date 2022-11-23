import Category from "../classes/Category";
import Constructor from "../classes/Constructor";
import OpenTDBError from "../classes/OpenTDBError";
import Util from "../classes/Util";
import { Routes } from "../typings/enums";
import type { ErrorResponse, RawCategoryResponse } from "../typings/interface";
import type { CategoryResolvable } from "../typings/types";

export default async function getCategory(arg: CategoryResolvable) {
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
