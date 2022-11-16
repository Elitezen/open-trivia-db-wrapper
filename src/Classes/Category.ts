import { CategoryNames, Routes } from "../typings/enums";
import { ErrorResponse, RawCategoryResponse } from "../typings/interface";
import { CategoryNameType, CategoryResolvable } from "../typings/types";
import Constructor from "./Constructor";
import OpenTDBError from "./OpenTDBError";
import Util from "./Util";

export default class Category {
  static allNames = Object.keys(CategoryNames).filter(key => isNaN(+key));

  static async getCategory(resolvable:CategoryResolvable) {
    let resolvedCategory:number;

    if (typeof resolvable === "string") {
      if (isNaN(+resolvable)) {
        if (Category.allNames.includes(resolvable)) {
          resolvedCategory = Category.idByName(resolvable)!;
        } else {
          return
          // err
        }
      } else {
        if (9 <= +resolvable && +resolvable <= 32) {
          resolvedCategory = parseInt(resolvable);
        } else {
          return
          // err
        }
      }
    } else if (typeof resolvable === "number") {
      if (9 <= resolvable && resolvable <= 32) {
        resolvedCategory = resolvable;
      } else {
        return
        // err
      }
    } else {
      return
      // err
    }

    const url = Util.createQueriedLink(Routes.Category, {
      category: resolvedCategory
    });

    try {
      const request = await Util.fetch<RawCategoryResponse>(url);
      return Constructor.category(request);
    } catch (err) {
      throw new OpenTDBError(err as ErrorResponse);
    }
  }

  static idByName(name:string) {
    const id = Category.allNames.indexOf(name);
    return id > -1 ? (id + 9) : null;
  }

  static nameById(id:number):CategoryNameType | null {
    const name = this.allNames[id - 9];
    return name !== undefined ? name as CategoryNameType : null;
  }
}