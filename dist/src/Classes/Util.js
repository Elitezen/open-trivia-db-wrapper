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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var node_fetch_1 = require("node-fetch");
var Category_1 = require("./Category");
/**
 * @class Class for utility functions.
 * @private
 */
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * Applies default values to missing keys.
     * @param {T} defaults The default shape of the type.
     * @param {T} current The current object
     * @returns
     */
    Util.assignDefaults = function (defaults, current) {
        if (current === undefined)
            return defaults;
        return Object.assign(defaults, current);
    };
    /**
     * Converts a urlLegacy string to ASCII.
     * @param {string} str
     * @returns {T}
     */
    Util.decodeUrlLegacy = function (str) {
        return decodeURIComponent(str).split("+").join(" ");
    };
    /**
     * Converts a url3968 string to ASCII.
     * @param {string} str
     * @returns {T}
     */
    Util.decodeUrl3968 = function (str) {
        return decodeURIComponent(str);
    };
    /**
     * Builds a URL with queries.
     * @param {string} baseURL The starting URL.
     * @param {ExtendedDictionary<null>} options The request key and values.
     * @param {string} concatSymbol The string symbol that joins each key-value pair.
     * @returns {string}
     */
    Util.createQueriedLink = function (baseURL, options, concatSymbol) {
        if (concatSymbol === void 0) { concatSymbol = "&"; }
        var optionsArr = Object.keys(options).map(function (key) {
            var value = options[key];
            if (key == 'category' && typeof value == 'string')
                value = Category_1.default.idByName(value);
            return "".concat(key, "=").concat(value);
        });
        return (baseURL += optionsArr.join(concatSymbol));
    };
    /**
     * Fetches data from an OpenTDB URL.
     * @param {string} url
     * @param {boolean} checkForResponseCode Whether to throw an error if a `responseCode` property with a value of `0` is found.
     * @returns {Promise<T>}
     */
    Util.fetch = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, checkForResponseCode) {
            var request, data;
            if (checkForResponseCode === void 0) { checkForResponseCode = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1.default)(url)];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, request.json()];
                    case 2:
                        data = _a.sent();
                        if (checkForResponseCode && (data === null || data === void 0 ? void 0 : data.response_code) !== 0) {
                            throw Util.getErrorByCode(data.response_code);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Returns the corresponding error data.
     * @param {ErrorCode} code The error code.
     * @returns {ErrorResponse} The error response data.
     */
    Util.getErrorByCode = function (code) {
        var responses = [
            {
                header: "No Results",
                text: "Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
            },
            {
                header: "Invalid Parameter",
                text: "Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)",
            },
            {
                header: "Token Not Found",
                text: "Session Token does not exist.",
            },
            {
                header: "Token Empty",
                text: "Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
            },
        ];
        return responses[code - 1];
    };
    /**
     * Shuffles an array. See https://bost.ocks.org/mike/shuffle/.
     * @param {T[]} arg
     * @returns {T[]}
     */
    Util.shuffleArray = function (arg) {
        if (!Array.isArray(arg))
            throw new TypeError("Argument must be an array");
        // Fisher–Yates shuffle: https://bost.ocks.org/mike/shuffle/
        // TypeScript Adjusted
        var m = arg.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = arg[m];
            arg[m] = arg[i];
            arg[i] = t;
        }
        return arg;
    };
    /**
     * Contains functions for converting Base64 to ASCII
     */
    Util.base64Decoder = {
        /**
         * Converts a Base64 string to ASCII
         * @param {string} str
         * @returns {string}
         */
        atob: function (str) {
            return Buffer.from(str, "base64").toString();
        },
        /**
         * Dynamically decodes a variable based on it's type.
         * @param {unknown} value any variable.
         * @returns {T}
         */
        decode: function (value) {
            return value == null ||
                value == undefined ||
                typeof value == "boolean" ||
                typeof value == "number"
                ? value
                : typeof value == "string"
                    ? Util.base64Decoder.decodeString(value)
                    : typeof value == "object" && !Array.isArray(value)
                        ? Util.base64Decoder.decodeObjectValues(value)
                        : Array.isArray(value)
                            ? Util.base64Decoder.decodeStringArray(value)
                            : value;
        },
        /**
         * Converts a Base64 string to ASCII.
         * @param {string} str
         * @returns {T}
         */
        decodeString: function (str) {
            return Util.base64Decoder.atob(str);
        },
        /**
         * Converts the values of an array based on type.
         * @param {string[]} arr
         * @returns {unknown[]}
         */
        decodeStringArray: function (arr) {
            return arr.map(function (v) { return Util.base64Decoder.decode(v); });
        },
        /**
         * Converts the values of an object from Base64 to ASCII.
         * @param {object} obj
         * @returns {any}
         */
        decodeObjectValues: function (obj) {
            var o = new Object().constructor();
            Object.entries(obj).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return (o[key] = Util.base64Decoder.decode(value));
            });
            return o;
        },
    };
    /**
     * Copy of `Util.base64Decoder.decodeString`.
     */
    Util.decodeBase64 = Util.base64Decoder.decodeString;
    return Util;
}());
exports.default = Util;
