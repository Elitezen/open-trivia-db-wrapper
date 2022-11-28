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
/**
 * @class Class for utility functions.
 * @private
 */
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.assignDefaults = function (defaults, current) {
        if (current === undefined)
            return defaults;
        return Object.assign(defaults, current);
    };
    Util.decodeUrlLegacy = function (str) {
        return decodeURIComponent(str).split("+").join(" ");
    };
    Util.decodeUrl3968 = function (str) {
        return decodeURIComponent(str);
    };
    Util.createQueriedLink = function (baseURL, options, concatSymbol) {
        if (concatSymbol === void 0) { concatSymbol = "&"; }
        var optionsArr = Object.keys(options).map(function (key) { return "".concat(key, "=").concat(options[key]); });
        return (baseURL += optionsArr.join(concatSymbol));
    };
    Util.fetch = function (url, checkForResponseCode) {
        if (checkForResponseCode === void 0) { checkForResponseCode = false; }
        return __awaiter(this, void 0, void 0, function () {
            var request, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
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
    Util.base64Decoder = {
        atob: function (str) {
            return Buffer.from(str, "base64").toString();
        },
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
        decodeString: function (str) {
            return Util.base64Decoder.atob(str);
        },
        decodeStringArray: function (arr) {
            return arr.map(function (v) { return Util.base64Decoder.decode(v); });
        },
        decodeObjectValues: function (obj) {
            var o = new Object().constructor();
            Object.entries(obj).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return (o[key] = Util.base64Decoder.decode(value));
            });
            return o;
        },
    };
    Util.decodeBase64 = Util.base64Decoder.decodeString;
    return Util;
}());
exports.default = Util;
