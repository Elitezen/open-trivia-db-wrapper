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
var Category_1 = require("./Category");
var Util_1 = require("./Util");
/**
 * @class Class for transforming raw API data to developer friendly data.
 * @private
 */
var Constructor = /** @class */ (function () {
    function Constructor() {
    }
    Constructor.category = function (rawCategoryData) {
        return {
            id: rawCategoryData.category_id,
            name: Category_1.default.nameById(rawCategoryData.category_id),
            questionCount: {
                total: rawCategoryData.category_question_count.total_question_count,
                easy: rawCategoryData.category_question_count.total_easy_question_count,
                medium: rawCategoryData.category_question_count.total_medium_question_count,
                hard: rawCategoryData.category_question_count.total_hard_question_count,
            },
        };
    };
    Constructor.questions = function (rawQuestions) {
        return rawQuestions.map(function (question) {
            return {
                value: question.question,
                category: {
                    id: Category_1.default.idByName(Category_1.default.decodeEncodedCategoryName(question.category)),
                    name: question.category,
                    getData: function () {
                        return Category_1.default.getCategory(this.id);
                    },
                },
                type: question.type,
                difficulty: question.difficulty,
                correctAnswer: question.correct_answer,
                incorrectAnswers: question.incorrect_answers,
                allAnswers: Util_1.default.shuffleArray(__spreadArray([
                    question.correct_answer
                ], question.incorrect_answers, true)),
                checkAnswer: function (str, caseSensitive) {
                    if (caseSensitive === void 0) { caseSensitive = false; }
                    if (!caseSensitive) {
                        return str.toLowerCase() === this.correctAnswer.toLowerCase();
                    }
                    return str === this.correctAnswer;
                },
            };
        });
    };
    return Constructor;
}());
exports.default = Constructor;
