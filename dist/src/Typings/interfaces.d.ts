import type Session from "../Classes/Session";
import { QuestionDifficulties, QuestionEncodings, QuestionTypes } from "./enums";
import type { AllAnswers, BooleanString, CategoryNameType, CategoryResolvable, ExtendedDictionary, IncorrectAnswers, QuestionDifficultyType, QuestionEncodingType, QuestionTypeType, ResponseCode } from "./types";
/**
 * Represents the data of an OpenTDB category.
 */
export interface CategoryData {
    /**
     * The unique id of this category.
     */
    id: number;
    /**
     * This category's name.
     */
    name: CategoryNameType;
    /**
     * Holds the amount of questions this category has for different difficulty levels.
     */
    questionCount: {
        total: number;
        easy: number;
        medium: number;
        hard: number;
    };
}
/**
 * Represents a basic abstracted error response.
 */
export interface ErrorResponse {
    header: string;
    text: string;
}
/**
 * Simplified category data.
 */
export interface MinifiedCategoryData {
    /**
     * This category's name.
     */
    id: number;
    /**
     * This category's name.
     */
    name: string;
    /**
     * Returns the completed data for this category.
     * @returns {Promise<CategoryData>}
     */
    getData: () => Promise<CategoryData>;
}
/**
 * Represents a question.
 */
export interface Question<QuestionType extends unknown | QuestionTypes = unknown> {
    /**
     * The category this question belongs to.
     */
    category: MinifiedCategoryData;
    /**
     * The type of question: Multiple Choice or True/False
     */
    type: QuestionType extends unknown ? QuestionTypeType : QuestionType;
    /**
     * The difficuly level of this question.
     */
    difficulty: QuestionDifficultyType;
    /**
     * The question itself.
     */
    value: string;
    /**
     * This question's correct answer.
     */
    correctAnswer: QuestionType extends unknown | "multiple" ? string : BooleanString;
    /**
     * This question's incorrect answers.
     */
    incorrectAnswers: QuestionType extends unknown ? IncorrectAnswers | BooleanString : QuestionType extends "multiple" ? IncorrectAnswers : BooleanString;
    /**
     * All choice options for this question.
     */
    allAnswers: QuestionType extends unknown ? AllAnswers<QuestionTypes.Multiple> | AllAnswers<QuestionTypes.Boolean> : QuestionType extends "multiple" ? AllAnswers<QuestionTypes.Multiple> : AllAnswers<QuestionTypes.Boolean>;
    /**
     * Compares the given string to this question's correct answer.
     * @param {string} str The string to check.
     * @param {boolean} caseSensitive Whether to be case sensitive when comparing strings.
     * @returns {booelean} Whether the given string is the correct answer.
     */
    checkAnswer: (str: string, caseSensitive?: boolean) => boolean;
}
/**
 * The options sent to OpenTDB describing the target questions to fetch.
 */
export interface QuestionOptions extends ExtendedDictionary<Session | null> {
    /**
     * How many questions to fetch.
     */
    amount: number;
    /**
     * The category of questions to fetch.
     */
    category: CategoryResolvable;
    /**
     * The difficulty of questions.
     */
    difficulty: QuestionDifficultyType | QuestionDifficulties;
    /**
     * The type of questions: Multiple Choice or True/False
     */
    type: QuestionTypeType | QuestionTypes;
    /**
     * How to encode the returning data.
     */
    encode: QuestionEncodingType | QuestionEncodings;
    /**
     * The API session to use.
     */
    session: Session | string | null;
}
/**
 * A question object as received from OpenTDB.
 */
export interface RawQuestion {
    /**
     * The name of this question's category.
     */
    category: string;
    /**
     * The type of question this is.
     */
    type: QuestionTypeType;
    /**
     * The difficulty level of this question.
     */
    difficulty: QuestionDifficultyType;
    /**
     * The question itself.
     */
    question: string;
    /**
     * This question's correct answer.
     */
    correct_answer: string;
    /**
     * This question's incorrect answers.
     */
    incorrect_answers: string[];
}
/**
 * A category object as received from OpenTDB.
 */
export interface RawCategoryResponse {
    /**
     * This category's unique id.
     */
    category_id: number;
    /**
     * The question counts for this category's different difficulties.
     */
    category_question_count: {
        total_question_count: number;
        total_easy_question_count: number;
        total_medium_question_count: number;
        total_hard_question_count: number;
    };
}
/**
 * The response object received from OpenTDB when fetching questions.
 */
export interface RawQuestionResponse {
    /**
     * The request's response code.
     */
    response_code: ResponseCode;
    /**
     * The received questions.
     */
    results: RawQuestion[];
}
/**
 * The response object received from OpenTDB when creating a session.
 */
export interface RawSessionStartResponse {
    /**
     * The request's response code.
     */
    response_code: ResponseCode;
    /**
     * The response's message.
     */
    response_message: string;
    /**
     * The new session's token.
     */
    token: string;
}
