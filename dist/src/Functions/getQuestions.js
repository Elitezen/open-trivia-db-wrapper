"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../Typings/enums");
var OpenTDBUtil_1 = require("../Classes/OpenTDBUtil");
var Category_1 = require("../Classes/Category");
var Session_1 = require("../Classes/Session");
/**
 * Fetches an array of questions based on provided options.
 * @param {QuestionOptions} options - The metadeta describing target questions.
 * @param {string | number} options.amount The amount of questions to fetch (min. 1, max. 50)
 * @param {?CategoryResolvable} options.category The category of questions.
 * @param {?QuestionDifficulty} options.difficulty The difficulty of questions.
 * @param {?QuestionEncoding} [options.encode='none'] The encoding of question values.
 * @param {?string} options.session The Session instance or API session token.
 * @returns {Promise<Question[]>} An Array of questions.
 * @example
 * const questions = await getQuestions({
    amount: 50,
    difficulty: 'easy',
    type: 'multiple',
    category: Category.allNames.SCIENCE_COMPUTERS
  });
 */
function getQuestions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var link, defaultOptions, filledOptions, targetEncode, finalOptions, finalLink, data, questions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    link = OpenTDBUtil_1.default.links.base.GET_QUESTIONS;
                    defaultOptions = {
                        amount: 10,
                        encode: enums_1.QuestionEncodings.none,
                    };
                    if ((options === null || options === void 0 ? void 0 : options.category) instanceof Category_1.default)
                        options.category = options.category.id;
                    if ((options === null || options === void 0 ? void 0 : options.session) instanceof Session_1.default) {
                        if (options.session.token === null)
                            process.emitWarning("Provided Session has a null token. Use Session.start() to start an API session");
                        options.session = options.session.token;
                    }
                    filledOptions = Object.assign(defaultOptions, options);
                    targetEncode = filledOptions.encode;
                    finalOptions = OpenTDBUtil_1.default.finalizeOptions(filledOptions);
                    finalLink = OpenTDBUtil_1.default.generateQueryString(link, finalOptions);
                    return [4 /*yield*/, OpenTDBUtil_1.default.openTDBRequest(finalLink)];
                case 1:
                    data = (_a.sent());
                    questions = OpenTDBUtil_1.default.parseRawQuestions(data.results);
                    if (targetEncode == "none" && finalOptions.encode == "base64") {
                        questions = questions.map(function (q) {
                            return OpenTDBUtil_1.default.base64Decoder.decodeObjectValues(q);
                        });
                    }
                    return [2 /*return*/, questions];
            }
        });
    });
}
exports.default = getQuestions;
