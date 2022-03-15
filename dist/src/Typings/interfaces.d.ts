import { CategoryName, CategoryResolvable, QuestionDifficulty, QuestionEncoding, QuestionType } from "./types";
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
    amount: number | `${number}` | null;
    category?: CategoryResolvable | null;
    difficulty?: QuestionDifficulty | null;
    type?: QuestionType | null;
    encode?: QuestionEncoding | null;
    token?: string | null;
}
