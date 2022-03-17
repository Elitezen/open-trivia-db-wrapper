import {
  CategoryName,
  CategoryNameResolvable,
  CategoryResolvable,
  NumberResolvable,
} from "../Typings/types";
import { EasyTriviaError } from "./CustomErrors";
import { CategoryNamesStrict, CategoryNamesPretty } from "../Typings/enums";

export default class Category {
  public readonly id: number;
  public readonly strictName: CategoryName<"Strict">;
  public readonly prettyName: CategoryName<"Pretty">;
  public static readonly allStrictNames = CategoryNamesStrict;
  public static readonly allPrettyNames = CategoryNamesPretty;

  constructor(arg: CategoryResolvable) {
    if (Category.isIdResolvable(arg as NumberResolvable)) {
      this.id = Number(arg);
    } else if (Category.isNameResolvable(arg as CategoryNameResolvable)) {
      this.id = Category.nameToId(arg as CategoryName<"Pretty" | "Strict">)!;
    } else {
      throw new EasyTriviaError(
        "Given argument could not be resolved into a category",
        EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG
      );
    }

    this.strictName = Category.idToStrictName(this.id)!;
    this.prettyName = Category.idToPrettyName(this.id)!;
  }

  public static idToStrictName(
    arg: NumberResolvable
  ): CategoryName<"Strict"> | null {
    if (!this.isIdResolvable(arg)) return null;
    return this.allStrictNames[+arg] as CategoryName<"Strict">;
  }

  public static idToPrettyName(
    arg: NumberResolvable
  ): CategoryName<"Pretty"> | null {
    if (!this.isIdResolvable(arg)) return null;
    return this.allPrettyNames[Number(arg)] as CategoryName<"Pretty">;
  }

  public static nameToId(arg: CategoryNameResolvable): number | null {
    if (!isNaN(+arg)) return null;
    return (
      CategoryNamesStrict[arg as CategoryName<"Strict">] ||
      CategoryNamesPretty[arg as CategoryName<"Pretty">] ||
      null
    );
  }

  public static isIdResolvable(arg: NumberResolvable): boolean {
    return !isNaN(+arg) && 9 <= arg && arg <= 32;
  }

  public static isNameResolvable(arg: string): boolean {
    const completeNameList = [
      ...Object.keys(this.allPrettyNames),
      ...Object.keys(this.allStrictNames),
    ]
      .filter((str) => isNaN(str as unknown as number))
      .map((str) => str.toLowerCase());

    return completeNameList.includes(arg?.toLowerCase?.());
  }

  public static prettyToStrictName(
    arg: CategoryName<"Pretty">
  ): CategoryName<"Strict"> | null {
    return this.idToStrictName(
      CategoryNamesPretty[arg as CategoryName<"Pretty">]
    );
  }

  public static strictToPrettyName(
    arg: CategoryName<"Strict">
  ): CategoryName<"Pretty"> | null {
    const id = CategoryNamesStrict[arg as CategoryName<"Strict">] as number;
    const entries = Array.from(Object.entries(CategoryNamesPretty)) as [
      CategoryName<"Pretty">,
      number
    ][];
    const entry = entries.find((e) => e[1] == id);

    return entry ? entry[0] : null;
  }
}
