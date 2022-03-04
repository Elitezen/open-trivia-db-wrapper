// Classes
const { Base64Decoder } = require("./classes/Base64Decoder");

const { Categories } = require("./classes/Categories");

const {
  EasyTriviaError,
  EasyTriviaResponseError,
} = require("./classes/Errors");

const { TriviaSession } = require("./classes/TriviaSession");

// Functions
const {
  _checkAmount,
  _checkCategory,
  _checkDifficulty,
  _checkEncode,
  _checkToken,
  _checkType,
  _request,
  _insertRandomly,
  _isCategoryId,
  _isObject,
} = require("./functions/private");

const { getOverallQuestionCount, getQuestions } = require("./functions/public");

// Constants
const Encodings = {
  NONE: "none",
  BASE64: "base64",
  URL3986: "url3986",
  URL_LEGACY: "urlLegacy",
};

module.exports = {
  _checkAmount,
  _checkCategory,
  _checkDifficulty,
  _checkEncode,
  _checkToken,
  _checkType,
  _request,
  _insertRandomly,
  _isCategoryId,
  _isObject,
  Base64Decoder,
  Categories,
  EasyTriviaError,
  EasyTriviaResponseError,
  Encodings,
  getOverallQuestionCount,
  getQuestions,
  TriviaSession,
};