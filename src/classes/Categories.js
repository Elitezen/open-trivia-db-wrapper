const { EasyTriviaError } = require("../classes/Errors");
const { allCategoryNames, categoryIdRange, links } = require('../constants/api.json');
const { errors } = require('../constants/library.json');
const _inRange = (num) => num >= categoryIdRange.min && num <= categoryIdRange.max;

class Categories {
  static allNames = allCategoryNames;

  static categoryByName(arg) {
    const index = this.allNames.indexOf(arg?.toUpperCase?.());
    if (index < 0) return null;
    return index + 9;
  }

  static categoryById(arg) {
    arg = +arg;
    if (!_inRange(arg)) return null;
    return this.allNames[arg - 9];
  }

  static async getCategoryData(arg) {
    const { _request } = require("../functions/private");
    const baseUrl = links.base.CATEGORY_DATA;

    let data = {};

    if (arg === undefined)
      throw new EasyTriviaError(
        "Argument for 'arg' is required",
        errors.headers.MISSING_ARG
      );
    else if (typeof arg == "number") {
      if (!_inRange(arg))
        throw new EasyTriviaError(
          `Given number (${arg}) for 'arg' is not a valid id (range ${categoryIdRange.max} - ${categoryIdRange.max})`,
          errors.headers.INVALID_ID
        );
      data = await _request(baseUrl + arg);
    } else if (typeof arg == "string") {
      const argInt = parseInt(arg);
      const argStr = this.categoryByName(arg);

      if (argStr) data = await _request(baseUrl + argStr);
      else if (!isNaN(argInt) && _inRange(argInt))
        data = await _request(baseUrl + argInt);
      else
        throw new EasyTriviaError(
          `Cannot resolve "${arg}" into a trivia category`,
          errors.headers.INVALID_NAME
        );
    } else {
      throw new EasyTriviaError(
        `Given argument (${arg}) for 'arg' is not of type string or number`,
        errors.headers.INVALID_ARG
      );
    }

    const {
      category_id: id,
      category_question_count: {
        total_question_count: total,
        total_easy_question_count: forEasy,
        total_medium_question_count: forMedium,
        total_hard_question_count: forHard,
      },
    } = data;

    const result = {
      id,
      name: this.categoryById(id),
      questionCounts: {
        total,
        forEasy,
        forMedium,
        forHard,
      },
    };

    return result;
  }

  static isCategoryResolvable(arg) {
    return !!(this.categoryById(arg) || this.categoryByName(arg));
  }

  static random(arg = 'ID') {
    console.log(arg);
    const resolvable = this.allNames[(Math.random() * this.allNames.length) << 0];
    console.log(resolvable);
    return (['NAME', 'ID'].includes(arg) && arg == 'NAME') ? resolvable : this.categoryByName(resolvable);
  }
}

module.exports = {
  Categories,
};
