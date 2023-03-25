/**
 * Enum for accessing OpenTDB Categories.
 */
export enum CategoryNames {
  "General Knowledge" = 9,
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
}

/**
 * Enums for question difficulties.
 */
export enum QuestionDifficulties {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * Enum for question encodings.
 */
export enum QuestionEncodings {
  Base64 = "base64",
  None = "none",
  Url3986 = "url3986",
  UrlLegacy = "urlLegacy",
}

/**
 * Enum for the types of questions: Multiple Choice or Boolean (True/False)
 */
export enum QuestionTypes {
  /**
   * A multiple choice question.
   */
  Multiple = "multiple",

  /**
   * A true/false question.
   */
  Boolean = "boolean",
}

/**
 * Enum for OpenTDB API routes.
 */
export enum Routes {
  Category = "https://opentdb.com/api_count.php?",
  Questions = "https://opentdb.com/api.php?",
  SessionReset = "https://opentdb.com/api_token.php?command=reset",
  SessionStart = "https://opentdb.com/api_token.php?command=request",
}
