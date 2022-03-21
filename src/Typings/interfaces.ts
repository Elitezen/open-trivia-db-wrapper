import {
  CategoryName,
  CategoryResolvable,
  NumberResolvable,
  QuestionDifficulty,
  QuestionEncoding,
  QuestionType,
} from "./types";

export interface OpenTDBResponseDefault<T> {
  response_code: number;
  results: T[];
}

export interface OpenTDBResponseSession {
  response_code: number,
  response_message?: string;
  token: string;
}

export interface RawCategoryData {
  total_question_count: number;
  total_easy_question_count: number;
  total_medium_question_count: number;
  total_hard_question_count: number;
}

export interface CategoryData {
  id: number;
  name: CategoryName<'Pretty'>;
  questionCounts: {
    total: number;
    forEasy: number;
    forMedium: number;
    forHard: number;
  }
}

export interface OpenTDBResponseCategoryData {
  category_id: number;
  category_question_count: RawCategoryData;
}

export interface QuestionBase {
  category: CategoryName;
  type: QuestionType;
  difficulty: QuestionDifficulty;
}

export interface RawQuestion extends QuestionBase {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question extends QuestionBase {
  value: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
  checkAnswer(arg: string): boolean;
}

export interface QuestionOptions {
  amount?: NumberResolvable | null;
  category?: CategoryResolvable | null;
  difficulty?: QuestionDifficulty | null;
  type?: QuestionType | null;
  encode?: QuestionEncoding | null;
  token?: string | null;
}
