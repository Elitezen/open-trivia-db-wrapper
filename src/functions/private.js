const { Categories } = require('../classes/Categories');
const { EasyTriviaError, EasyTriviaResponseError } = require('../classes/Errors');
const { get } = require('https');

const _checkAmount = arg => {
  if (arg === undefined) throw new EasyTriviaError('Amount option for QuestionOptions is required', 'missing_option');
  if (typeof arg == 'number') {
    if (arg % 1 !== 0) throw new EasyTriviaError('Amount option for QuestionOptions must be a whole number', 'invalid_option');
    else if (arg < 1 || arg > 50) throw new EasyTriviaError('Amount option for QuestionOptions must be within 1 - 50', 'invalid_option');
    else return arg;
  } else if (typeof arg == 'string') {
    if (isNaN(+arg)) throw new EasyTriviaError('Amount option for QuestionOptions must be of type number or string number', 'invalid_option');
    else if (+arg < 1 || +arg > 50) throw new EasyTriviaError('Amount option for QuestionOptions must be within 1 - 50', 'invalid_option');
    else return parseInt(arg);
  } else throw new EasyTriviaError(`Amount option for QuestionOptions must be of type number or string number, received ${typeof arg}`, 'invalid_option');
};

const _checkCategory = arg => {
  if (arg === undefined) return null;
  if (typeof arg == 'number') {
    if (!Categories.ids[arg]) throw new EasyTriviaError(`Category option (${arg}) for QuestionOptions does not resolve into a trivia category id`, 'invalid_option');
    return arg;
  } else if (typeof arg == 'string') {
    const idByName = Categories.names[arg.toUpperCase()];
    if (idByName) return idByName;
    else if (!isNaN(+arg)) {
      const idByNumber = parseInt(arg);
      if (Categories.ids[idByNumber]) return idByNumber;
      else throw new EasyTriviaError(`Category option ("${arg}") for QuestionOptions does not resolve into a trivia category id`, 'invalid_option');
    } else {
      throw new EasyTriviaError(`Category option ("${arg}") for QuestionOptions does not resolve into a trivia category name`, 'invalid_option');
    }
  } else {
    throw new EasyTriviaError(`Category option for QuestionOptions must be of type number or string number, received ${typeof arg}`, 'invalid_option');
  }
};

const _checkDifficulty = arg => {
  if (arg === undefined) return null;
  if (typeof arg == 'string') {
    arg = arg.toLowerCase();
    if (!['easy', 'medium', 'hard'].includes(arg)) throw new EasyTriviaError(`Difficulty option ("${arg}") for QuestionOptions does not resolve into a question difficulty`, 'invalid_option');
    return arg;
  } else throw new EasyTriviaError(`Difficulty option for QuestionOptions must be of type string, received ${typeof arg}`, 'invalid_option');
};

const _checkEncode = arg => {
  if (arg === undefined) return null;
  if (typeof arg == 'string') {
    if (!['urlLegacy', 'url3986', 'base64', 'none'].includes(arg)) throw new EasyTriviaError(`Encode option ("${arg}") for QuestionOptions does not resolve into a form of question encoding`, 'invalid_option');
    return arg == 'none' ? 'base64' : arg;
  } else throw new EasyTriviaError(`Encode option for QuestionOptions must be of type string, received ${typeof arg}`, 'invalid_option');
};

const _checkToken = arg => {
  if (arg === undefined) return null;
  if (typeof arg != 'string') throw new EasyTriviaError(`Token option for QuestionOptions must be of type string`, 'invalid_option');
  else if (typeof arg == 'string' && arg.length < 1) throw new EasyTriviaError(`Token option for QuestionOptions must not be empty`, 'invalid_option');
  return arg;
};

const _checkType = arg => {
  if (arg === undefined) return null;
  if (typeof arg == 'string') {
    if (!['multiple', 'boolean'].includes(arg.toLowerCase())) throw new EasyTriviaError(`Type option ("${arg}") for QuestionOptions does not resolve into a question type`, 'invalid_option');
    return arg.toLowerCase();
  } else throw new EasyTriviaError(`Type option for QuestionOptions must be of type string, received ${typeof arg}`, 'invalid_option');
}

const _request = url => {
  if (url === undefined) throw new EasyTriviaError('URL argument is required, received undefined', 'missing_argument');
  if (typeof url != 'string') throw new EasyTriviaError(`URL argument must be of type string, received ${typeof url}`, 'invalid_argument');
  return new Promise((resolve, reject) => {
    let data = '';
    const req = get(url, res => {
      res.on('data', chunk => data += chunk);
      res.on('error', reject);
      res.on('end', () => {
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
          throw new EasyTriviaError('API responded with no data', 'empty_response');
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

const _insertRandomly = (element, originalArray) => {
  let newArray = [];
  originalArray.forEach((e, i) => newArray[i] = e);
  const randomIndex = Math.floor(Math.random() * originalArray.length) + (Math.random() > 0.5 ? 1 : -1);
  newArray.splice(randomIndex, 0, element);
  return newArray;
};

const _isCategoryId = arg => {
  if (isNaN(+arg)) false;
  return 9 <= arg && arg <= 32;
};

const _isObject = element => {
  return typeof element === 'object' &&
  typeof element !== 'function' &&
  !Array.isArray(element) &&
  element !== null;
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
  _isObject
};  