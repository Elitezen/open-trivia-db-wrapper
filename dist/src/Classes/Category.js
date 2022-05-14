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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomErrors_1 = require("./CustomErrors");
var enums_1 = require("../Typings/enums");
var getCategoryData_1 = require("../Functions/getCategoryData");
var getQuestions_1 = require("../Functions/getQuestions");
/**
 * @class For trivia category related data retrieving
 */
var Category = /** @class */ (function () {
    function Category(arg) {
        if (Category.isIdResolvable(arg)) {
            this.id = Number(arg);
        }
        else if (Category.isNameResolvable(arg)) {
            this.id = Category.nameToId(arg);
        }
        else {
            throw new CustomErrors_1.OpenTDBError("Given argument could not be resolved into a category", CustomErrors_1.OpenTDBError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        }
        this.strictName = Category.idToStrictName(this.id);
        this.prettyName = Category.idToPrettyName(this.id);
    }
    /**
     * Takes a category's id and returns it's 'strict' (constant) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Strict"> | null} The strict name, null if `arg` is unresolvable
     * @static
     */
    Category.idToStrictName = function (arg) {
        if (!this.isIdResolvable(arg))
            return null;
        return this.allNames[+arg];
    };
    /**
     * Takes a category's id and returns it's 'pretty' (display) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Pretty"> | null} The pretty name, null if `arg` is unresolvable
     * @static
     */
    Category.idToPrettyName = function (arg) {
        if (!this.isIdResolvable(arg))
            return null;
        return this.allPrettyNames[Number(arg)];
    };
    /**
     * Converts a given category name into the category's id
     * @param {CategoryNameResolvable} arg The category's name
     * @returns {number | null} The category id
     * @static
     */
    Category.nameToId = function (arg) {
        if (!isNaN(+arg))
            return null;
        return (enums_1.CategoryNamesStrict[arg] ||
            enums_1.CategoryNamesPretty[arg] ||
            null);
    };
    /**
     * Returns whether or not the given number can be resolved into a category id
     * @param {NumberResolvable} arg The number to resolve
     * @returns {boolean} Whether or not the given number resembles a category id
     * @static
     */
    Category.isIdResolvable = function (arg) {
        return !isNaN(+arg) && 9 <= arg && arg <= 32;
    };
    /**
     * Returns whether or not the given string can be resolved into a category name
     * @param {NumberResolvable} arg The name to resolve
     * @returns {boolean} Whether or not the given string resembles a category name
     * @static
     */
    Category.isNameResolvable = function (arg) {
        var _a, _b;
        var completeNameList = __spreadArray(__spreadArray([], Object.keys(this.allPrettyNames), true), Object.keys(this.allNames), true).filter(function (str) { return isNaN(str); })
            .map(function (str) { return str.toLowerCase(); });
        return completeNameList.includes((_b = (_a = arg) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a));
    };
    /**
     * Converts a category's pretty name into it's strict version
     * @param {CategoryName<"Pretty">} arg The category's pretty name
     * @returns {CategoryName<"Strict"> | null} The category's strict name
     * @static
     */
    Category.prettyToStrictName = function (arg) {
        return this.idToStrictName(enums_1.CategoryNamesPretty[arg]);
    };
    /**
     * Converts a category's strict name into it's pretty version
     * @param {CategoryName<"Pretty">} arg The category's strict name
     * @returns {CategoryName<"Strict"> | null} The category's pretty name
     * @static
     */
    Category.strictToPrettyName = function (arg) {
        var id = enums_1.CategoryNamesStrict[arg];
        var entries = Array.from(Object.entries(enums_1.CategoryNamesPretty));
        var entry = entries.find(function (e) { return e[1] == id; });
        return entry ? entry[0] : null;
    };
    /**
     * Chooses a random category and returns it's id.
     * @param {CategoryResolvableType} type? What type of resolvable to return
     * @returns {number | string | null} A random category id or name.
     * @static
     */
    Category.random = function (type) {
        if (type === void 0) { type = "ID"; }
        var names = Object.keys(this.allPrettyNames).filter(function (val) {
            return isNaN(+val);
        });
        var resolvableName = names[(Math.random() * names.length) << 0];
        if (type == "ID" || !["NAME", "ID"].includes(type))
            return this.nameToId(resolvableName);
        return resolvableName;
    };
    /**
     * Resolves a given category resolvable and returns a `Category` class or `null`.
     * @param {CategoryResolvable} arg The argument to resolve.
     * @returns {Category | null} A new instance of `Category` if argument is resolvable.
     * @static
     */
    Category.resolve = function (arg) {
        try {
            var resultClass = new Category(arg);
            return resultClass;
        }
        catch (_) {
            return null;
        }
    };
    /**
     * Fetches the data about this category. Wrapper for `getCategoryData`
     * @returns {Promise<CategoryData>} A new promise of the category data
     */
    Category.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, getCategoryData_1.default)(this.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetches questions for this category. Wrapper for `getQuestions`
     * @param {Omit<QuestionOptions, "category">} options `QuestionOptions` with `category` omitted.
     * @returns {Promise<Question[]>} An array of questions
     */
    Category.prototype.fetchQuestions = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var finalOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalOptions = {};
                        if (options)
                            finalOptions = options;
                        finalOptions.category = this.id;
                        return [4 /*yield*/, (0, getQuestions_1.default)(finalOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * All OpenTDB category names in 'strict' (constant) form
     */
    Category.allNames = enums_1.CategoryNamesStrict;
    /**
     * All OpenTDB category names in 'pretty' (display) form
     */
    Category.allPrettyNames = enums_1.CategoryNamesPretty;
    return Category;
}());
exports.default = Category;
