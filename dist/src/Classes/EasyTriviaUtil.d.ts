import { Question, QuestionOptions, RawQuestion } from "../Typings/interfaces";
import { QuestionDifficulty, QuestionEncoding, QuestionType } from "../Typings/types";
export default class EasyTriviaUtil {
    static apiResponses: {
        name: string;
        message: string;
    }[];
    static links: {
        base: {
            CATEGORY_DATA: string;
            GET_QUESTIONS: string;
            RESET_SESSION: string;
        };
        full: {
            START_SESSION: string;
            OVR_QUESTION_CNT: string;
        };
    };
    static questionDifficulties: QuestionDifficulty[];
    static questionEncodings: QuestionEncoding[];
    static questionTypes: QuestionType[];
    static openTDBRequest(url: string): Promise<unknown>;
    static shuffleArray<T>(arg: T[]): T[];
    static base64Decoder: {
        atob(str: string): string;
        decode(value: unknown): unknown;
        decodeString(str: string): string;
        decodeStringArray(arr: string[]): unknown[];
        decodeObjectValues(obj: object): any;
    };
    static finalizeOptions(options: QuestionOptions): QuestionOptions;
    static generateQueryString(baseLink: string, obj: object): string;
    static parseRawQuestions(questions: RawQuestion[]): Question[];
}
