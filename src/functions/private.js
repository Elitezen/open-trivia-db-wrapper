const { Categories } = require("../classes/Categories");
const {
  EasyTriviaError,
  EasyTriviaResponseError,
} = require("../classes/Errors");
const { get } = require("https");
const { errors } = require('../../constants/library.json');
const { 
  categoryIdRange,
  questionCountRange, 
  questionDifficulties, 
  questionEncodings, 
  questionTypes 
} = require('../../constants/api.json');

const _checkAmount = (arg) => {
  if (arg === undefined)
    throw new EasyTriviaError(
      "'amount' option for QuestionOptions is required",
      errors.headers.MISSING_OPT
    );
  if (typeof arg == "number") {
    if (arg % 1 !== 0)
      throw new EasyTriviaError(
        "'amount' option for QuestionOptions must be a whole number",
        errors.headers.INVALID_OPT
      );
    else if (arg < questionCountRange.min || arg > questionCountRange.max)
      throw new EasyTriviaError(
        `'amount' option for QuestionOptions must from ${questionCountRange.min} to ${questionCountRange.max}`,
        errors.headers.INVALID_OPT
      );
    else return arg;
  } else if (typeof arg == "string") {
    if (isNaN(+arg))
      throw new EasyTriviaError(
        "'amount' option for QuestionOptions must be of type number or string number",
        errors.headers.INVALID_OPT
      );
    else if (+arg < questionCountRange.min || +arg > questionCountRange.max)
      throw new EasyTriviaError(
        `'amount' option for QuestionOptions must from ${questionCountRange.min} to ${questionCountRange.max}`,
        errors.headers.INVALID_OPT
      );
    else return parseInt(arg);
  } else
    throw new EasyTriviaError(
      `'amount' option for QuestionOptions must be of type number or string number, received ${typeof arg}`,
      errors.headers.INVALID_OPT
    );
};

const _checkCategory = (arg) => {
  if (arg === undefined) return null;
  if (typeof arg == "number") {
    if (!Categories.ids[arg])
      throw new EasyTriviaError(
        `'category' option (${arg}) for QuestionOptions does not resolve into a trivia category id`,
        errors.headers.INVALID_OPT
      );
    return arg;
  } else if (typeof arg == "string") {
    const idByName = Categories.allNames.indexOf(arg.toUpperCase()) + 9;
    if (idByName) return idByName;
    else if (!isNaN(+arg)) {
      const idByNumber = parseInt(arg);
      if (Categories.ids[idByNumber]) return idByNumber;
      else
        throw new EasyTriviaError(
          `'category' option ("${arg}") for QuestionOptions does not resolve into a trivia category id`,
          errors.headers.INVALID_OPT
        );
    } else {
      throw new EasyTriviaError(
        `'category' option ("${arg}") for QuestionOptions does not resolve into a trivia category name`,
        errors.headers.INVALID_OPT
      );
    }
  } else {
    throw new EasyTriviaError(
      `'category' option for QuestionOptions must be of type number or string number, received ${typeof arg}`,
      errors.headers.INVALID_OPT
    );
  }
};

const _checkDifficulty = (arg) => {
  if (arg === undefined) return null;
  if (typeof arg == "string") {
    arg = arg.toLowerCase();
    if (!questionDifficulties.includes(arg))
      throw new EasyTriviaError(
        `'difficulty' option ("${arg}") for QuestionOptions does not resolve into a question difficulty`,
        errors.headers.INVALID_OPT
      );
    return arg;
  } else
    throw new EasyTriviaError(
      `'difficulty' option for QuestionOptions must be of type string, received ${typeof arg}`,
      errors.headers.INVALID_OPT
    );
};

const _checkEncode = (arg) => {
  if (arg === undefined) return null;
  if (typeof arg == "string") {
    if (!questionEncodings.includes(arg))
      throw new EasyTriviaError(
        `'encode' option ("${arg}") for QuestionOptions does not resolve into a form of question encoding`,
        errors.headers.INVALID_OPT
      );
    return arg == "none" ? "base64" : arg;
  } else
    throw new EasyTriviaError(
      `'encode' option for QuestionOptions must be of type string, received ${typeof arg}`,
      errors.headers.INVALID_OPT
    );
};

const _checkToken = (arg) => {
  if (arg === undefined) return null;
  if (typeof arg != "string")
    throw new EasyTriviaError(
      `'token' option for QuestionOptions must be of type string`,
      errors.headers.INVALID_OPT
    );
  else if (typeof arg == "string" && arg.length < 1)
    throw new EasyTriviaError(
      `'token' option for QuestionOptions must not be empty`,
      errors.headers.INVALID_OPT
    );
  return arg;
};

const _checkType = (arg) => {
  if (arg === undefined) return null;
  if (typeof arg == "string") {
    if (!questionTypes.includes(arg.toLowerCase()))
      throw new EasyTriviaError(
        `'type' option ("${arg}") for QuestionOptions does not resolve into a question type`,
        errors.headers.INVALID_OPT
      );
    return arg.toLowerCase();
  } else
    throw new EasyTriviaError(
      `'type' option for QuestionOptions must be of type string, received ${typeof arg}`,
      errors.headers.INVALID_OPT
    );
};

const _request = (url) => {
  if (url === undefined)
    throw new EasyTriviaError(
      "'url' argument is required, received undefined",
      "missing_argument"
    );
  if (typeof url != "string")
    throw new EasyTriviaError(
      `'url' argument must be of type string, received ${typeof url}`,
      "invalid_argument"
    );
  return new Promise((resolve, reject) => {
    let data = "";
    const req = get(url, (res) => {
      res.on("data", (chunk) => (data += chunk));
      res.on("error", reject);
      res.on("end", () => {
        if (data.length > 0) {
          try {
            const body = JSON.parse(data);
            const resCodeStr = body?.response_code?.toString?.() || null;
            if (resCodeStr) {
              const resCode = parseInt(resCodeStr);
              if (resCode != 0) throw new EasyTriviaResponseError(resCode);
            }

            resolve(body);
          } catch (err) {
            reject(err);
          }
        } else {
          throw new EasyTriviaError(
            "API responded with no data",
            errors.headers.EMPTY_RESPONSE
          );
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
};

const _insertRandomly = (element, originalArray) => {
  let newArray = [];
  originalArray.forEach((e, i) => (newArray[i] = e));
  const randomIndex =
    Math.floor(Math.random() * originalArray.length) +
    (Math.random() > 0.5 ? 1 : -1);
  newArray.splice(randomIndex, 0, element);
  return newArray;
};

const _isCategoryId = (arg) => {
  if (isNaN(+arg)) false;
  return categoryIdRange.min <= arg && arg <= categoryIdRange.max;
};

const _isObject = (element) => {
  return (
    typeof element === "object" &&
    typeof element !== "function" &&
    !Array.isArray(element) &&
    element !== null
  );
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
};