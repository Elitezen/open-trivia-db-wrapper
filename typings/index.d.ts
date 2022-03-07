declare module 'easy-trivia' {
  type CategoryResolvableType = 'NAME' | 'ID';

  type TriviaCategoryName = 'GENERAL_KNOWLEDGE'
  | 'ENTERTAINMENT_BOOKS'
  | 'ENTERTAINMENT_FILM'
  | 'ENTERTAINMENT_MUSIC'
  | 'ENTERTAINMENT_MUSICALS_AND_THEATRES'
  | 'ENTERTAINMENT_TELEVISION'
  | 'ENTERTAINMENT_VIDEO_GAMES'
  | 'ENTERTAINMENT_BOARD_GAMES'
  | 'SCIENCE_AND_NATURE'
  | 'SCIENCE_COMPUTERS'
  | 'SCIENCE_MATHEMATICS'
  | 'MYTHOLOGY'
  | 'SPORTS'
  | 'GEOGRAPHY'
  | 'HISTORY'
  | 'POLITICS'
  | 'ART'
  | 'CELEBRITIES'
  | 'ANIMALS'
  | 'VEHICLES'
  | 'ENTERTAINMENT_COMICS'
  | 'SCIENCE_GADGETS'
  | 'ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA'
  | 'ENTERTAINMENT_CARTOON_AND_ANIMATIONS';

  type TriviaCategoryResolvable = TriviaCategoryName | `${number}` | number;
  type ResponseCode = 0 | 1 | 2 | 3 | 4;
  type TriviaSessionToken = string | null;
  type TriviaQuestionDifficulty = 'easy' | 'medium' | 'hard';
  type TriviaQuestionEncoding = 'urlLegacy' | 'url3986' | 'base64' | 'none';
  type TriviaQuestionType = 'multiple' | 'boolean';

  export interface RawResponseWithCode {
    response_code: ResponseCode,
  }
  
  export interface RawResponseWithCodeAndResponseMessage extends RawResponseWithCode {
    response_message: string;
  }
  
  export interface RawResponseWithCodeAndMessage extends RawResponseWithCode {
    message: string;
  }
  
  export interface RawTriviaCategoryQuestionData {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
  }
  
  export interface TriviaCategoryQuestionData {
    total: number;
    forEasy: number;
    forMedium: number;
    forHard: number;
  }
  
  export interface RawTriviaCategoryData {
    category_id: number;
    category_question_count: RawTriviaCategoryQuestionData;
  }
  
  export interface TriviaCategoryData {
    id: number;
    name: TriviaCategoryName;
    questionCounts: TriviaCategoryQuestionData;
  }
  
  export interface RawSessionTokenGenerateResponse extends RawResponseWithCodeAndResponseMessage {
    token: string;
  }
  
  export interface RawSessionTokenResetResponse extends RawResponseWithCode {
    token: string;
  }
  
  export interface RawTriviaAllCategoriesResponse {
    overall: RawTriviaQuestionData;
    categories: { 
      [key: string]: RawTriviaQuestionData
    };
  }
  
  export interface TriviaAllCategoriesResponse {
    overall: TriviaQuestionData;
    categories: { 
      [key: string]: TriviaQuestionData
    };
  }
  
  export interface RawTriviaCategoriesResponse {
    trivia_categories: object[];
  }
  
  export interface TriviaCategoriesResponse {
    triviaCategories: object[];
  }
  
  export interface RawTriviaCategoryResponse {
    category_id: number;
    category_question_count: RawTriviaCategoryData;
  }
  
  export interface TriviaCategoryResponse {
    categoryId: number;
    categoryQuestionCount: TriviaCategoryData;
  }
  
  export interface QuestionOptions {
    amount: number | `${number}`;
    category?: TriviaCategoryResolvable;
    difficulty?: TriviaQuestionDifficulty;
    type?: TriviaQuestionType;
    encode?: TriviaQuestionEncoding;
    token?: string;
  }
  
  export interface RawTriviaQuestionData {
    total_num_of_questions: number;
    total_num_of_pending_questions: number;
    total_num_of_verified_questions: number;
    total_num_of_rejected_questions: number;
  }
  
  export interface TriviaQuestionData {
    totalCount: number;
    totalPendingCount: number;
    totalVerifiedCount: number;
    totalRejectedCount: number;
  }
  
  export interface RawTriviaQuestionsResponse {
    response_code: ResponseCode;
    results: object[];
  }
  
  export interface BaseTriviaQuestion {
    category: TriviaCategoryName;
    type: TriviaQuestionType;
    difficulty: TriviaQuestionDifficulty;
  }
  
  export interface RawTriviaQuestion extends BaseTriviaQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  export interface BaseParsedTriviaQuestion extends BaseTriviaQuestion {
    correctAnswer: string;
    incorrectAnswers: string[];
  }
  
  export interface ParsedRawTriviaQuestion extends BaseParsedTriviaQuestion {
    question: string;
  }
  
  export interface ParsedTriviaQuestion extends BaseParsedTriviaQuestion {
    value: string;
  }
  
  export interface TriviaQuestion extends BaseTriviaQuestion {
    value: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    allAnswers: string[];
    checkAnswer(arg: string): boolean;
  }

  /**
    * Checks if the given argument is a number resolvable and is within range of 1 - 50.
    * @param {unknown} arg The argument to check.
    * @returns {number | void} The given argument if valid, Otherwise an error is thrown.
    * @private
    */
  function _checkAmount(arg:unknown): number | void;

  /**
   * Checks if the given argument is a category resolvable.
   * @param {unknown} arg The argument to check.
   * @returns {number | null | void} The category's id if resolvable, Otherwise null or an error is thrown.
   * @private
   */
  function _checkCategory(arg:unknown): number | null | void;

  /**
   * Checks if the given argument is a valid trivia question difficulty.
   * @param {unknown} arg The argument to check.
   * @returns {void | null | TriviaQuestionDifficulty} Returns the argument if valid, `null` if not.
   * @private
   */
  function _checkDifficulty(arg:unknown): TriviaQuestionDifficulty | null | void;

  /**
   * Checks if the given argument is a valid trivia question encoding.
   * @param {unknown} arg The argument to check.
   * @returns {void | null | TriviaQuestionDifficulty} Returns the argument if valid, `null` if not.
   * @private
   */
  function _checkEncode(arg:unknown): TriviaQuestionEncoding | null | void;

  /**
   * Checks if the given argument is a session token.
   * @param {unknown} arg The argument to check.
   * @returns {string | null | void} Returns the argument if valid, `null` if not.
   * @private
   */
  function _checkToken(arg:unknown): string | null | void;

  /**
   * Checks if the given argument is a valid question type.
   * @param {unknown} arg The argument to check.
   * @returns {TriviaQuestionType | null | void} Returns the argument if it has length and is valid, `null` if not.
   * @private
   */
  function _checkType(arg:unknown): TriviaQuestionType | null | void;

  /**
   * Fetches data from given url.
   * @async
   * @param {string} url The url to fetch data from.
   * @returns {T} The data object.
   */
  function _request<T>(url:string): Promise<T>;

  /**
   * Inserts a given element into an array at a random index
   * @param element The element to insert
   * @param array The array to insert into
   * @returns {T[]} The given array now with the element inserted
   */
  function _insertRandomly<T>(element:T, array:T[]): T[];

  /**
   * Checks if given number is in range of category ID's (9 - 32)
   * @param {number} arg The number to check.
   * @returns {boolean} Whether or not this number is in ID range.
   * @private
   */
  function _isCategoryId(arg:unknown): boolean;

  /**
   * Checks if the given element is an object but not a function, array or null.
   * @param {any} element The element to check.
   * @returns {boolean} Whether or not the element is an object.
   * @private
   */
  function _isObject(element:unknown): boolean

  /**
   * Fetches the question count for all of Open Trivia DB.
   * @async
   * @returns {Promise<TriviaQuestionData>} The data of overall question count.
   */
  function getOverallQuestionCount(): Promise<TriviaQuestionData>;

  /**
   * Fetches questions according to the given options.
   * @param {QuestionOptions} options `QuestionOptions`
   * @param {string | number} options.amount The amount of questions to fetch (min 1, max 50)
   * @param {?string} options.category The category of questions. Only 1 category per invoke.
   * @param {?string} options.difficulty The difficulty of questions.
   * @param {?string} [options.encode='none'] The encoding of question values.
   * @param {?string} token The session token.
   * @returns {Promise<TriviaQuestion[]>} An Array of questions.
   */
  function getQuestions(options:QuestionOptions): Promise<TriviaQuestion[]>

  /**
   * @class Provides methods to decode various data types from Base64 to UTF-8.
   * @private
   */
  class Base64Decoder {
    /**
     * Takes a base64 string and returns it decoded in UTF-8.
     * @param {string} str String to decode.
     * @returns {string} Decoded string in UTF-8.
     */
    public static atob(str: string): string;

    /**
     * Decodes data based on it's type.
     * @param {T} value The data to decode. 
     * @returns {T} The decoded data.
     */
    public static decode<T>(value:T): T;

    /**
     * Takes a string and decodes it.
     * @param {string} str String to decode. 
     * @returns {string} Decoded string in UTF-8.
     */
    public static decodeString(str:string): string;

    /**
     * Takes a string array and decodes each value.
     * @param {string[]} arr The array to decode.
     * @returns {string[]} The array with it's decoded values.
     */
    public static decodeStringArray(arr:string[]): string[];

    /**
     * Takens an object and decodes it's values.
     * @param {T} obj The object to decode.
     * @returns {T} The object with it's decoded values.
     */
    public static decodeObjectValues<T>(obj:T): T;
  }

  /** @class Class for trivia category related data retrieving. */
  class Categories {
    /** @static All category names in a string array. */
    public static allNames: TriviaCategoryName[];

    /**
     * Resolves given category and returns it's 'pretty' name
     * @param {string} str A category resolvable
     * @returns {string} The pretty category name
     */
    public static prettyCategoryName(str: TriviaCategoryResolvable): string;

    /** 
     * Returns the resolved value of the given category name if valid.
     * @param {string} arg The category name.
     * @returns {number?} The category's id.
     */
    public static categoryByName(arg:TriviaCategoryName): number | undefined;

    /** 
     * Returns the resolved value of the given category id if valid.
     * @param {number | `${number}`} arg The category id.
     * @returns {number?} The category's name.
     */
    public static categoryById(arg:number | `${number}`): TriviaCategoryName | undefined;

    /**
     * Fetches a trivia category's data.
     * @async 
     * @param {TriviaCategoryResolvable} arg An argument resolving to a trivia category.
     * @returns {Promise<TriviaCategoryData>} The data of the category.
     */
    public static getCategoryData(arg:TriviaCategoryResolvable): Promise<TriviaCategoryData>;

    /**
     * Checks whether the given argument can be resolved into a trivia category.
     * @param {unknown} arg The argument to check.
     * @returns {boolean} Whether the given argument can be resolved into a trivia category id or name.
     */
    public static isCategoryResolvable(arg:unknown): boolean;

    /**
     * Chooses a random category and returns it's id.
     * @param {string} arg? What type of resolvable to return
     * @returns {number | string} A random category id or name.
     */
    public static random(arg?: CategoryResolvableType): number;
  }

  /** 
   * @class Error class for library errors.
   * @extends Error
   * @private
   */
  class EasyTriviaError extends Error {
    /**
     * @constructor
     * @param {string} message Description of the error. 
     * @param {string} header The error name.
     */
    constructor(message:string, header:string);
  }

  /** 
   * @class Error class for OpenTDB API response errors.
   * @extends Error 
   * @private
   */
  class EasyTriviaResponseError extends Error {
    public static apiResponses: { name:string, message:string }[];

    /**
     * @constructor
     * @param {!ResponseCode} errorCode The response code.
     */
    constructor(errorCode:ResponseCode);
  }

  /** @class Class for starting OpenTDB API sessions */
  class TriviaSession {
    token: TriviaSessionToken;

    /**
     * Starts a new trivia session and assigns the new token to `TriviaSession#token`.
     * @async
     * @returns {Promise<TriviaSessionToken>} The session token.
     */
    public start(): Promise<TriviaSessionToken>;

    /**
     * Resets the current trivia session.
     * @async
     * @returns {Promise<TriviaSessionToken>} The current session token.
     */
    public reset(): Promise<TriviaSessionToken>;
    
    /** Sets `TriviaSession#token` to null */
    public end(): void;
  }

  const Encodings: { [key in 'NONE' | 'BASE64' | 'URL3986' | 'URL_LEGACY']: TriviaQuestionEncoding }
}