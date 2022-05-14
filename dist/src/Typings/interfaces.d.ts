import Session from "../Classes/Session";
import { CategoryName, CategoryResolvable, NumberResolvable, QuestionDifficulty, QuestionEncoding, QuestionType } from "./types";
/**
 * A basic response from OpenTDB with `results` being an array of T
 * @interface
 */
export interface OpenTDBResponseDefault<T> {
    response_code: number;
    results: T[];
}
/**
 * A new session response from OpenTDB
 * @interface
 */
export interface OpenTDBResponseSession {
    response_code: number;
    response_message?: string;
    token: string;
}
/**
 * Category data as recieved from OpenTDB
 * @interface
 */
export interface RawCategoryData {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
}
/**
 * Category data parsed for the end developer
 * @interface
 */
export interface CategoryData {
    id: number;
    name: CategoryName<"Pretty">;
    questionCounts: {
        total: number;
        forEasy: number;
        forMedium: number;
        forHard: number;
    };
}
/**
 * A category data response from OpenTDB
 * @interface
 */
export interface OpenTDBResponseCategoryData {
    category_id: number;
    category_question_count: RawCategoryData;
}
/**
 * The common entries between a `RawQuestion` and a `Question`
 * @interface
 */
export interface QuestionBase {
    category: CategoryName;
    type: QuestionType;
    difficulty: QuestionDifficulty;
}
/**
 * A raw question as recieved from OpenTDB
 * @interface
 */
export interface RawQuestion extends QuestionBase {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
/**
 * A question parsed for the end developer
 * @interface
 */
export interface Question extends QuestionBase {
    value: string;
    correctAnswer: string;
    incorrectAnswers: string[] | [boolean];
    allAnswers: string[] | [boolean, boolean];
    checkAnswer(arg: string): boolean;
}
/**
 * Metadeta describing the target questions
 * @interface
 */
export interface QuestionOptions {
    amount?: NumberResolvable | null;
    category?: CategoryResolvable | null;
    difficulty?: QuestionDifficulty | null;
    type?: QuestionType | null;
    encode?: QuestionEncoding | null;
    session?: Session | string | null;
}
