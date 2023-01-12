import type Session from "../classes/Session";

import {
  QuestionDifficulties,
  QuestionEncodings,
  QuestionTypes,
} from "./enums";
import type {
  AllAnswers,
  BooleanString,
  CategoryNameType,
  CategoryResolvable,
  ExtendedDictionary,
  IncorrectAnswers,
  QuestionDifficultyType,
  QuestionEncodingType,
  QuestionTypeType,
  ResponseCode,
} from "./types";

export interface CategoryData {
  id: number;
  name: CategoryNameType;
  questionCount: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface ErrorResponse {
  header: string;
  text: string;
}

export interface MinifiedCategoryData {
  id: number;
  name: string;
  getData: () => Promise<CategoryData>;
}

export interface Question<
  QuestionType extends unknown | QuestionTypes = unknown
> {
  category: MinifiedCategoryData;
  type: QuestionType extends unknown ? QuestionTypeType : QuestionType;
  difficulty: QuestionDifficultyType;
  value: string;
  correctAnswer: QuestionType extends unknown | "multiple"
    ? string
    : BooleanString;
  incorrectAnswers: QuestionType extends unknown
    ? IncorrectAnswers | BooleanString
    : QuestionType extends "multiple"
    ? IncorrectAnswers
    : BooleanString;
  allAnswers: QuestionType extends unknown
    ? AllAnswers<QuestionTypes.Multiple> | AllAnswers<QuestionTypes.Boolean>
    : QuestionType extends "multiple"
    ? AllAnswers<QuestionTypes.Multiple>
    : AllAnswers<QuestionTypes.Boolean>;
  checkAnswer: (str: string, caseSensitive?: boolean) => boolean;
}

export interface QuestionOptions extends ExtendedDictionary<Session | null> {
  amount: number;
  category: CategoryResolvable;
  difficulty: QuestionDifficultyType | QuestionDifficulties;
  type: QuestionTypeType | QuestionTypes;
  encode: QuestionEncodingType | QuestionEncodings;
  session: Session | string | null;
}

export interface RawQuestion {
  category: string;
  type: QuestionTypeType;
  difficulty: QuestionDifficultyType;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface RawCategoryResponse {
  category_id: number;
  category_question_count: {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
  };
}

export interface RawQuestionResponse {
  response_code: ResponseCode;
  results: RawQuestion[];
}

export interface RawSessionStartResponse {
  response_code: ResponseCode;
  response_message: string;
  token: string;
}
