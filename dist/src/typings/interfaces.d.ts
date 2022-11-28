import type Session from "../classes/Session";
import { QuestionDifficulties, QuestionEncodings, QuestionTypes } from "./enums";
import type { CategoryNameType, CategoryResolvable, ExtendedDictionary, QuestionDifficultyType, QuestionEncodingType, QuestionTypeType, ResponseCode } from "./types";
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
export interface Question {
    category: MinifiedCategoryData;
    type: QuestionTypeType;
    difficulty: QuestionDifficultyType;
    value: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    allAnswers: string[];
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
