import { CategoryName, CategoryNameResolvable, CategoryResolvable, CategoryResolvableType, NumberResolvable } from "../Typings/types";
import { CategoryNamesStrict, CategoryNamesPretty } from "../Typings/enums";
import { CategoryData, Question } from "../Typings/interfaces";
import { QuestionOptions } from "../Typings/interfaces";
/**
 * @class For trivia category related data retrieving
 */
export default class Category {
    /**
     * This category's API id
     */
    readonly id: number;
    /**
     * This category's 'strict' (constant) name
     */
    readonly strictName: CategoryName<"Strict">;
    /**
     * This category's 'pretty' (display) name
     */
    readonly prettyName: CategoryName<"Pretty">;
    /**
     * All OpenTDB category names in 'strict' (constant) form
     */
    static readonly allNames: typeof CategoryNamesStrict;
    /**
     * All OpenTDB category names in 'pretty' (display) form
     */
    static readonly allPrettyNames: typeof CategoryNamesPretty;
    constructor(arg: CategoryResolvable);
    /**
     * Takes a category's id and returns it's 'strict' (constant) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Strict"> | null} The strict name, null if `arg` is unresolvable
     * @static
     */
    static idToStrictName(arg: NumberResolvable): CategoryName<"Strict"> | null;
    /**
     * Takes a category's id and returns it's 'pretty' (display) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Pretty"> | null} The pretty name, null if `arg` is unresolvable
     * @static
     */
    static idToPrettyName(arg: NumberResolvable): CategoryName<"Pretty"> | null;
    /**
     * Converts a given category name into the category's id
     * @param {CategoryNameResolvable} arg The category's name
     * @returns {number | null} The category id
     * @static
     */
    static nameToId(arg: CategoryNameResolvable): number | null;
    /**
     * Returns whether or not the given number can be resolved into a category id
     * @param {NumberResolvable} arg The number to resolve
     * @returns {boolean} Whether or not the given number resembles a category id
     * @static
     */
    static isIdResolvable(arg: NumberResolvable | CategoryResolvable): boolean;
    /**
     * Returns whether or not the given string can be resolved into a category name
     * @param {NumberResolvable} arg The name to resolve
     * @returns {boolean} Whether or not the given string resembles a category name
     * @static
     */
    static isNameResolvable(arg: string | CategoryResolvable): boolean;
    /**
     * Converts a category's pretty name into it's strict version
     * @param {CategoryName<"Pretty">} arg The category's pretty name
     * @returns {CategoryName<"Strict"> | null} The category's strict name
     * @static
     */
    static prettyToStrictName(arg: CategoryName<"Pretty">): CategoryName<"Strict"> | null;
    /**
     * Converts a category's strict name into it's pretty version
     * @param {CategoryName<"Pretty">} arg The category's strict name
     * @returns {CategoryName<"Strict"> | null} The category's pretty name
     * @static
     */
    static strictToPrettyName(arg: CategoryName<"Strict">): CategoryName<"Pretty"> | null;
    /**
     * Chooses a random category and returns it's id.
     * @param {CategoryResolvableType} type? What type of resolvable to return
     * @returns {number | string | null} A random category id or name.
     * @static
     */
    static random(type?: CategoryResolvableType): number | CategoryName<"Pretty">;
    /**
     * Resolves a given category resolvable and returns a `Category` class or `null`.
     * @param {CategoryResolvable} arg The argument to resolve.
     * @returns {Category | null} A new instance of `Category` if argument is resolvable.
     * @static
     */
    static resolve(arg: CategoryResolvable): Category | null;
    /**
     * Fetches the data about this category. Wrapper for `getCategoryData`
     * @returns {Promise<CategoryData>} A new promise of the category data
     */
    getData(): Promise<CategoryData>;
    /**
     * Fetches questions for this category. Wrapper for `getQuestions`
     * @param {Omit<QuestionOptions, "category">} options `QuestionOptions` with `category` omitted.
     * @returns {Promise<Question[]>} An array of questions
     */
    fetchQuestions(options?: Omit<QuestionOptions, "category">): Promise<Question[]>;
}
