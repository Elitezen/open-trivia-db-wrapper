import { CategoryNames, QuestionDifficulties, QuestionEncodings, QuestionTypes } from "./enums";
import type { CategoryNameType, QuestionDifficultyType, QuestionEncodingType, QuestionTypeType, ResponseCode, SimpleDictionary } from "./types";

export interface CategoryData {
  id: number;
  name: CategoryNameType;
  questionCount: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  }
}

export interface ErrorResponse {
  header: string;
  text: string;
}

export interface MinifiedCategoryData {
  id: number;
  name: string;
}

export interface Question {
  category: MinifiedCategoryData;
  type: QuestionTypeType;
  difficulty: QuestionDifficultyType;
  value: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
}

export interface QuestionOptions extends SimpleDictionary {
  amount: number;
  category: CategoryNames;
  difficulty: QuestionDifficultyType | QuestionDifficulties;
  type: QuestionTypeType | QuestionTypes;
  encode: QuestionEncodingType | QuestionEncodings;
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
  }
}

export interface RawQuestionResponse {
  response_code: ResponseCode,
  results: RawQuestion[]
}