"use strict";
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
var https_1 = require("https");
var CustomErrors_1 = require("./CustomErrors");
var Validator_1 = require("./Validator");
var EasyTriviaUtil = /** @class */ (function () {
    function EasyTriviaUtil() {
    }
    EasyTriviaUtil.openTDBRequest = function (url) {
        if (url === undefined)
            throw new CustomErrors_1.EasyTriviaError("'url' argument is required, received undefined", "missing_argument");
        if (typeof url != "string")
            throw new CustomErrors_1.EasyTriviaError("'url' argument must be of type string, received ".concat(typeof url), "invalid_argument");
        return new Promise(function (resolve, reject) {
            var data = "";
            var req = (0, https_1.get)(url, function (res) {
                res.on("data", function (chunk) { return (data += chunk); });
                res.on("error", reject);
                res.on("end", function () {
                    var _a, _b;
                    if (data.length > 0) {
                        try {
                            var body = JSON.parse(data);
                            var responseCode = (((_b = (_a = body === null || body === void 0 ? void 0 : body.response_code) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) ||
                                null);
                            if (responseCode) {
                                if (responseCode > 0)
                                    throw new CustomErrors_1.OpenTDBResponse(responseCode);
                            }
                            resolve(body);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                    else {
                        throw new CustomErrors_1.EasyTriviaError("API responded with no data", CustomErrors_1.EasyTriviaError.errors.headers.EMPTY_RESPONSE);
                    }
                });
            });
            req.on("error", reject);
            req.end();
        });
    };
    EasyTriviaUtil.shuffleArray = function (arg) {
        if (!Array.isArray(arg))
            throw new TypeError("Argument must be an array");
        // Fisher–Yates shuffle: https://bost.ocks.org/mike/shuffle/
        // TypeScript Adjusted
        var m = arg.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = arg[m];
            arg[m] = arg[i];
            arg[i] = t;
        }
        return arg;
    };
    EasyTriviaUtil.finalizeOptions = function (options) {
        var validator = new Validator_1.default(options);
        var targetEncode = options.encode;
        var verifiedOptions = {
            amount: validator.checkAmount(),
            difficulty: validator.checkDifficulty(),
            type: validator.checkType(),
            category: validator.checkCategory(),
            session: validator.checkToken(),
            encode: targetEncode == "none" ? "base64" : validator.checkEncode(),
        };
        return verifiedOptions;
    };
    EasyTriviaUtil.generateQueryString = function (baseLink, obj) {
        var queryArgs = [];
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value !== null && value !== undefined)
                queryArgs.push("".concat(key, "=").concat(value));
        }
        return baseLink + queryArgs.join("&");
    };
    EasyTriviaUtil.parseRawQuestions = function (questions) {
        var _this = this;
        var result = questions.map(function (q) {
            var parsedQuestion = {
                value: q.question,
                category: q.category,
                type: q.type,
                difficulty: q.difficulty,
                correctAnswer: q.correct_answer,
                incorrectAnswers: q.incorrect_answers,
                allAnswers: EasyTriviaUtil.shuffleArray(__spreadArray([
                    q.correct_answer
                ], q.incorrect_answers, true)),
                checkAnswer: function (arg) {
                    var _a, _b;
                    return (((_a = arg === null || arg === void 0 ? void 0 : arg.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(arg)) ==
                        _this.base64Decoder.atob(q.correct_answer).toLowerCase() ||
                        ((_b = arg === null || arg === void 0 ? void 0 : arg.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(arg)) == q.correct_answer);
                },
            };
            return parsedQuestion;
        });
        return result;
    };
    EasyTriviaUtil.apiResponses = [
        { name: "SUCCESS", message: "Successful response" },
        {
            name: "NO_RESULTS",
            message: "Could not return results. The API does not have enough questions for your query",
        },
        { name: "INVALID_PARAMETER", message: "An invalid parameter was received" },
        {
            name: "TOKEN_NOT_FOUND",
            message: "The given API token is invalid or does not exist",
        },
        {
            name: "TOKEN_EMPTY",
            message: "This trivia session has returned all possible questions for the specified query",
        },
    ];
    EasyTriviaUtil.links = {
        base: {
            CATEGORY_DATA: "https://opentdb.com/api_count.php?category=",
            GET_QUESTIONS: "https://opentdb.com/api.php?",
            RESET_SESSION: "https://opentdb.com/api_token.php?command=reset&token=",
        },
        full: {
            START_SESSION: "https://opentdb.com/api_token.php?command=request",
            OVR_QUESTION_CNT: "https://opentdb.com/api_count_global.php",
        },
    };
    EasyTriviaUtil.questionDifficulties = [
        "easy",
        "medium",
        "hard",
    ];
    EasyTriviaUtil.questionEncodings = [
        "urlLegacy",
        "url3986",
        "base64",
        "none",
    ];
    EasyTriviaUtil.questionTypes = ["multiple", "boolean"];
    EasyTriviaUtil.base64Decoder = {
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
                    ? this.decodeString(value)
                    : typeof value == "object" && !Array.isArray(value)
                        ? this.decodeObjectValues(value)
                        : Array.isArray(value)
                            ? this.decodeStringArray(value)
                            : value;
        },
        decodeString: function (str) {
            return this.atob(str);
        },
        decodeStringArray: function (arr) {
            var _this = this;
            return arr.map(function (v) { return _this.decode(v); });
        },
        decodeObjectValues: function (obj) {
            var _this = this;
            var o = new Object().constructor();
            Object.entries(obj).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return (o[key] = _this.decode(value));
            });
            return o;
        },
    };
    return EasyTriviaUtil;
}());
exports.default = EasyTriviaUtil;
