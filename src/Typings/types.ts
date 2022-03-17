import { Question, RawQuestion } from "./interfaces";
import {
  CategoryNamesStrict,
  CategoryNameVersions,
  CategoryNamesPretty,
  QuestionDifficulties,
  QuestionTypes,
  QuestionEncodings,
  QuestionVersions,
} from "./enums";
export type CategoryIdResolvable = NumberResolvable;
export type CategoryNameResolvable = CategoryName<"Pretty" | "Strict"> | string;
export type CategoryName<T extends CategoryNameVersion = "Strict"> =
  T extends "Pretty" ? CategoryNamePretty : CategoryNameStrict;
export type CategoryNameVersion = keyof typeof CategoryNameVersions;
export type CategoryNamePretty = keyof typeof CategoryNamesPretty;
export type CategoryNameStrict = keyof typeof CategoryNamesStrict;
export type CategoryResolvable = CategoryNameResolvable | CategoryIdResolvable;
export type NumberResolvable = `${number}` | number;
export type Questions<T extends QuestionVersion = "Final"> = T extends "Raw"
  ? RawQuestion
  : Question;
export type QuestionDifficulty = keyof typeof QuestionDifficulties;
export type QuestionType = keyof typeof QuestionTypes;
export type QuestionEncoding = keyof typeof QuestionEncodings;
export type QuestionVersion = keyof typeof QuestionVersions;
