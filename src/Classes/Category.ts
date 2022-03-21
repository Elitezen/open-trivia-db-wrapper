import {
  CategoryName,
  CategoryNameResolvable,
  CategoryResolvable,
  CategoryResolvableType,
  NumberResolvable,
} from "../Typings/types";
import { EasyTriviaError } from "./CustomErrors";
import { CategoryNamesStrict, CategoryNamesPretty } from "../Typings/enums";
import getCategoryData from "../Functions/getCategoryData";
import { CategoryData, Question } from "../Typings/interfaces";
import { QuestionOptions } from "../Typings/interfaces";
import getQuestions from "../Functions/getQuestions";

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
  public static isIdResolvable(
    arg: NumberResolvable | CategoryResolvable
  ): boolean {
    return !isNaN(+arg) && 9 <= arg && arg <= 32;
  }

  /**
   * Returns whether or not the given string can be resolved into a category name
   * @param {NumberResolvable} arg The name to resolve
   * @returns {boolean} Whether or not the given string resembles a category name
   * @static
   */
  public static isNameResolvable(arg: string | CategoryResolvable): boolean {
    const completeNameList = [
      ...Object.keys(this.allPrettyNames),
      ...Object.keys(this.allStrictNames),
    ]
      .filter((str) => isNaN(str as unknown as number))
      .map((str) => str.toLowerCase());

    return completeNameList.includes((arg as string)?.toLowerCase?.());
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

  /**
   * Chooses a random category and returns it's id.
   * @param {CategoryResolvableType} type? What type of resolvable to return
   * @returns {number | string | null} A random category id or name.
   * @static
   */
  public static random(
    type: CategoryResolvableType = "ID"
  ): number | CategoryName<"Pretty"> {
    const names = Object.keys(this.allPrettyNames).filter((val) =>
      isNaN(+val)
    ) as CategoryName<"Pretty">[];
    const resolvableName = names[(Math.random() * names.length) << 0];
    if (type == "ID" || !["NAME", "ID"].includes(type))
      return this.nameToId(resolvableName) as number;
    return resolvableName;
  }

  /**
   * Resolves a given category resolvable and returns a `Category` class or `null`.
   * @param {CategoryResolvable} arg The argument to resolve.
   * @returns {Category | null} A new instance of `Category` if argument is resolvable.
   * @static
   */
  public static resolve(arg: CategoryResolvable): Category | null {
    try {
      const resultClass = new Category(arg);
      return resultClass;
    } catch (_) {
      return null;
    }
  }

  /**
   * Fetches the data about this category. Wrapper for `getCategoryData`
   * @returns {Promise<CategoryData>} A new promise of the category data
   */
  async getData(): Promise<CategoryData> {
    return await getCategoryData(this.id);
  }

  /**
   * Fetches questions for this category. Wrapper for `getQuestions`
   * @param {Omit<QuestionOptions, "category">} options `QuestionOptions` with `category` omitted.
   * @returns {Promise<Question[]>} An array of questions
   */
  async fetchQuestions(
    options?: Omit<QuestionOptions, "category">
  ): Promise<Question[]> {
    let finalOptions: Partial<QuestionOptions> = {};
    if (options) finalOptions = options;
    finalOptions.category = this.id;

    return await getQuestions(finalOptions);
  }
}
