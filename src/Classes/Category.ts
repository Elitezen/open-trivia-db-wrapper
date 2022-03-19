import {
  CategoryName,
  CategoryNameResolvable,
  CategoryResolvable,
  NumberResolvable,
} from "../Typings/types";
import { EasyTriviaError } from "./CustomErrors";
import { CategoryNamesStrict, CategoryNamesPretty } from "../Typings/enums";

/**
 * @class For trivia category related data retrieving
 */
export default class Category {
  /**
   * This category's API id
   */
  public readonly id: number;

  /**
   * This category's 'strict' (constant) name
   */
  public readonly strictName: CategoryName<"Strict">;

  /**
   * This category's 'pretty' (display) name
   */
  public readonly prettyName: CategoryName<"Pretty">;

  /**
   * All OpenTDB category names in 'strict' (constant) form
   */
  public static readonly allStrictNames = CategoryNamesStrict;

  /**
   * All OpenTDB category names in 'pretty' (display) form
   */
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

  /**
   * Takes a category's id and returns it's 'strict' (constant) name
   * @param {NumberResolvable} arg 
   * @returns {CategoryName<"Strict"> | null} The strict name, null if `arg` is unresolvable
   * @static
   */
  public static idToStrictName(
    arg: NumberResolvable
  ): CategoryName<"Strict"> | null {
    if (!this.isIdResolvable(arg)) return null;
    return this.allStrictNames[+arg] as CategoryName<"Strict">;
  }

  /**
   * Takes a category's id and returns it's 'pretty' (display) name
   * @param {NumberResolvable} arg 
   * @returns {CategoryName<"Pretty"> | null} The pretty name, null if `arg` is unresolvable
   * @static
   */
  public static idToPrettyName(
    arg: NumberResolvable
  ): CategoryName<"Pretty"> | null {
    if (!this.isIdResolvable(arg)) return null;
    return this.allPrettyNames[Number(arg)] as CategoryName<"Pretty">;
  }

  /**
   * Converts a given category name into the category's id
   * @param {CategoryNameResolvable} arg The category's name
   * @returns {number | null} The category id
   * @static
   */
  public static nameToId(arg: CategoryNameResolvable): number | null {
    if (!isNaN(+arg)) return null;
    return (
      CategoryNamesStrict[arg as CategoryName<"Strict">] ||
      CategoryNamesPretty[arg as CategoryName<"Pretty">] ||
      null
    );
  }

  /**
   * Returns whether or not the given number can be resolved into a category id
   * @param {NumberResolvable} arg The number to resolve 
   * @returns {boolean} Whether or not the given number resembles a category id
   * @static
   */
  public static isIdResolvable(arg: NumberResolvable): boolean {
    return !isNaN(+arg) && 9 <= arg && arg <= 32;
  }

  /**
   * Returns whether or not the given string can be resolved into a category name
   * @param {NumberResolvable} arg The name to resolve 
   * @returns {boolean} Whether or not the given string resembles a category name
   * @static
   */
  public static isNameResolvable(arg: string): boolean {
    const completeNameList = [
      ...Object.keys(this.allPrettyNames),
      ...Object.keys(this.allStrictNames),
    ]
      .filter((str) => isNaN(str as unknown as number))
      .map((str) => str.toLowerCase());

    return completeNameList.includes(arg?.toLowerCase?.());
  }

  /**
   * Converts a category's pretty name into it's strict version
   * @param {CategoryName<"Pretty">} arg The category's pretty name
   * @returns {CategoryName<"Strict"> | null} The category's strict name
   * @static
   */
  public static prettyToStrictName(
    arg: CategoryName<"Pretty">
  ): CategoryName<"Strict"> | null {
    return this.idToStrictName(
      CategoryNamesPretty[arg as CategoryName<"Pretty">]
    );
  }

  /**
   * Converts a category's strict name into it's pretty version
   * @param {CategoryName<"Pretty">} arg The category's strict name
   * @returns {CategoryName<"Strict"> | null} The category's pretty name
   * @static
   */
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
