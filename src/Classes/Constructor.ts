import type {
  CategoryData,
  Question,
  RawCategoryResponse,
  RawQuestion,
} from "../typings/interface";
import Category from "./Category";
import Util from "./Util";

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

  static questions(rawQuestions: RawQuestion[]): Question[] {
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
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        allAnswers: Util.shuffleArray([
          question.correct_answer,
          ...question.incorrect_answers,
        ]),
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
