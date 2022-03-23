import { QuestionOptions } from "../Typings/interfaces";
import { QuestionDifficulty } from "../Typings/types";
export default class Validator {
    private readonly options;
    constructor(options: QuestionOptions);
    checkAmount(): number | null;
    checkCategory(): number | null;
    checkDifficulty(): QuestionDifficulty | null;
    checkEncode(): "none" | "base64" | "url3986" | "urlLegacy" | null;
    checkToken(): string | null;
    checkType(): "boolean" | "multiple" | null;
    static _checkCategory(category: unknown): number | null;
}
