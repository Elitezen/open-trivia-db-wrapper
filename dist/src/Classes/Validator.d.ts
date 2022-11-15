import { QuestionDifficulties, QuestionEncodings, QuestionTypes } from "../Typings/enums";
import { QuestionOptions } from "../Typings/interfaces";
export default class Validator {
    private readonly options;
    constructor(options: QuestionOptions);
    checkAmount(): number | null;
    checkCategory(): number | null;
    checkDifficulty(): QuestionDifficulties | null;
    checkEncode(): QuestionEncodings | null;
    checkToken(): string | null;
    checkType(): QuestionTypes | null;
    static _checkCategory(category: unknown): number | null;
}
