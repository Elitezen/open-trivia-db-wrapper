import { QuestionOptions } from "../Typings/interfaces";
export default class Validator {
    private readonly options;
    constructor(options: QuestionOptions);
    checkAmount(): void;
    checkCategory(): void;
    checkDifficulty(): void;
    checkEncode(): void;
    checkToken(): void;
    checkType(): void;
}
