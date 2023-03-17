import { QuestionTypes } from "../Typings/enums";
import type {
  CategoryData,
  Question,
  RawCategoryResponse,
  RawQuestion,
} from "../Typings/interfaces";
import { AllAnswers, IncorrectAnswers } from "../Typings/types";
import Category from "./Category";
import Util from "./Util";

/**
 * @class Class for transforming raw API data to developer friendly data.
 * @private
 */
export default class Constructor {
  static category(rawCategoryData: RawCategoryResponse): CategoryData {
    return {
      id: rawCategoryData.category_id,
      name: Category.nameById(rawCategoryData.category_id)!,
      questionCount: {
        total: rawCategoryData.category_question_count.total_question_count,
        easy: rawCategoryData.category_question_count.total_easy_question_count,
        medium:
          rawCategoryData.category_question_count.total_medium_question_count,
        hard: rawCategoryData.category_question_count.total_hard_question_count,
      },
    };
  }

  static questions(rawQuestions: RawQuestion[]): Question<unknown>[] {
    return rawQuestions.map((question) => {
      return {
        value: question.question,
        category: {
          id: Category.idByName(
            Category.decodeEncodedCategoryName(question.category)!
          )!,
          name: question.category,
          getData: function () {
            return Category.getCategory(this.id);
          },
        },
        type: question.type,
        difficulty: question.difficulty,
        correctAnswer:
          question.type === "multiple"
            ? question.correct_answer
            : question.correct_answer.toLowerCase(),
        incorrectAnswers:
          question.type === "multiple"
            ? (question.incorrect_answers as IncorrectAnswers)
            : (question.incorrect_answers[0].toLowerCase() as `${boolean}`),
        allAnswers: Util.shuffleArray([
          question.correct_answer,
          ...(question.type === "multiple"
            ? question.incorrect_answers
            : question.incorrect_answers.map((s) => s.toLowerCase())),
        ]) as AllAnswers<QuestionTypes.Boolean | QuestionTypes.Multiple>,
        checkAnswer: function (str, caseSensitive = false) {
          if (!caseSensitive) {
            return str.toLowerCase() === this.correctAnswer.toLowerCase();
          }

          return str === this.correctAnswer;
        },
      };
    });
  }
}
