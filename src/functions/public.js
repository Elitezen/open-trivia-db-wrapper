const { Base64Decoder } = require("../classes/Base64Decoder");
const {
  _checkAmount,
  _checkCategory,
  _checkDifficulty,
  _checkEncode,
  _checkToken,
  _checkType,
  _request,
  _insertRandomly,
} = require("./private");
const { links } = require('../constants/api.json');
const { defaults } = require('../constants/library.json');

const getOverallQuestionCount = async () => {
  const data = await _request(links.full.OVR_QUESTION_CNT);

  const {
    overall: {
      total_num_of_questions: totalCount,
      total_num_of_verified_questions: totalVerifiedCount,
      total_num_of_pending_questions: totalPendingCount,
      total_num_of_rejected_questions: totalRejectedCount,
    },
  } = data;

  const result = {
    totalCount,
    totalVerifiedCount,
    totalPendingCount,
    totalRejectedCount,
  };

  return result;
};

const getQuestions = async (options) => {
  const optionDefaults = {
    encode: defaults.questionEncode,
  };

  options = Object.assign(optionDefaults, options);

  const { encode: originalEncode } = options;
  const adjustedOptions = {
    amount: _checkAmount(options.amount),
    category: _checkCategory(options.category),
    difficulty: _checkDifficulty(options.difficulty),
    type: _checkType(options.type),
    encode: _checkEncode(options.encode),
    token: _checkToken(options.token),
  };

  let queryArgs = [];
  for (const [key, value] of Object.entries(adjustedOptions)) {
    if (value !== null) queryArgs.push(`${key}=${value}`);
  }

  const queryString = queryArgs.join("&");
  const data = await _request(links.base.GET_QUESTIONS + queryString);
  let questions = data.results.map((q) => {
    const {
      category,
      difficulty,
      type,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = q;
    return {
      value: question,
      category,
      difficulty,
      type,
      correctAnswer,
      incorrectAnswers,
      allAnswers: _insertRandomly(q.correct_answer, q.incorrect_answers),
      checkAnswer: function (val) {
        if (val === undefined) return false;
        return this.correctAnswer.toLowerCase() == val.toLowerCase();
      },
    };
  });

  if (originalEncode == "none" && adjustedOptions.encode == "base64") {
    questions = questions.map((q) => Base64Decoder.decodeObjectValues(q));
  }

  return questions;
};

module.exports = {
  getOverallQuestionCount,
  getQuestions,
};
