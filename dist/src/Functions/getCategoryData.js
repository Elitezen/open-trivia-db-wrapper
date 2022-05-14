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
var Category_1 = require("../Classes/Category");
var CustomErrors_1 = require("../Classes/CustomErrors");
var OpenTDBUtil_1 = require("../Classes/OpenTDBUtil");
/**
 * Fetches a trivia category's data.
 * @param {CategoryResolvable} arg An argument resolving to a trivia category.
 * @returns {Promise<CategoryData>} The data of the category.
 */
function getCategoryData(arg) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, baseLink, data, id, _b, total, forEasy, forMedium, forHard, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    categoryId = (_a = Category_1.default.resolve(arg)) === null || _a === void 0 ? void 0 : _a.id;
                    if (!categoryId) {
                        throw new CustomErrors_1.OpenTDBError("Given argument does not resolve into a trivia category", CustomErrors_1.OpenTDBError.errors.headers.INVALID_ARG);
                    }
                    baseLink = OpenTDBUtil_1.default.links.base.CATEGORY_DATA;
                    return [4 /*yield*/, OpenTDBUtil_1.default.openTDBRequest(baseLink + categoryId)];
                case 1:
                    data = (_c.sent());
                    id = data.category_id, _b = data.category_question_count, total = _b.total_question_count, forEasy = _b.total_easy_question_count, forMedium = _b.total_medium_question_count, forHard = _b.total_hard_question_count;
                    result = {
                        id: id,
                        name: Category_1.default.idToPrettyName(id),
                        questionCounts: {
                            total: total,
                            forEasy: forEasy,
                            forMedium: forMedium,
                            forHard: forHard,
                        },
                    };
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.default = getCategoryData;
