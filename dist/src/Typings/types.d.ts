import type { CategoryNames, QuestionTypes } from "./enums";
/**
 * All the answers for a question.
 */
export type AllAnswers<T extends QuestionTypes> = T extends QuestionTypes.Boolean ? [BooleanString, BooleanString] : [string, string, string, string];
/**
 * A stringified boolean.
 */
export type BooleanString = `${boolean}`;
/**
 * The names of all categories.
 */
export type CategoryNameType = keyof typeof CategoryNames;
/**
 * A value that can be recognized as a category.
 */
export type CategoryResolvable = CategoryNameType | CategoryNames | number;
export type Dictionary<K extends string, V> = Record<K, V>;
export type ErrorCode = 1 | 2 | 3 | 4;
/**
 * All the incorrect answers for a question.
 */
export type IncorrectAnswers = [string, string, string];
/**
 * The different difficulty levels.
 */
export type QuestionDifficultyType = "easy" | "medium" | "hard";
/**
 * The different question encodings.
 */
export type QuestionEncodingType = "none" | "base64" | "url3986" | "urlLegacy";
/**
 * The different question types.
 */
export type QuestionTypeType = "multiple" | "boolean";
export type ResponseCode = 0 | ErrorCode;
export type SimpleDictionary = Dictionary<string, string | number>;
export type ExtendedDictionary<V extends unknown> = Dictionary<string, string | number | V>;
