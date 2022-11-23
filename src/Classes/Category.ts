import { CategoryNames } from "../typings/enums";
import type { CategoryNameType } from "../typings/types";
import getCategory from "../functions/getCategory";
import Util from "./Util";

export default class Category {
  static allNames = Object.keys(CategoryNames).filter((key) => isNaN(+key));

  static getCategory = getCategory;

  static idByName(name: string) {
    const id = Category.allNames.indexOf(name);
    return id > -1 ? id + 9 : null;
  }

  static nameById(id: number): CategoryNameType | null {
    const name = Category.allNames[id - 9];
    return name !== undefined ? (name as CategoryNameType) : null;
  }

  static decodeEncodedCategoryName(str: string): CategoryNameType | null {
    return (
      [
        Util.decodeBase64<CategoryNameType>(str),
        Util.decodeUrl3968<CategoryNameType>(str),
        Util.decodeUrlLegacy<CategoryNameType>(str),
      ].find((str) => Category.allNames.includes(str)) || null
    );
  }
}