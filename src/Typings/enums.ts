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

export enum QuestionDifficulties {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuestionEncodings {
  Base64 = "base64",
  None = "none",
  Url3986 = "url3986",
  UrlLegacy = "urlLegacy",
}

export enum QuestionTypes {
  Multiple = "multiple",
  Boolean = "boolean",
}

export enum Routes {
  Category = "https://opentdb.com/api_count.php?",
  Questions = "https://opentdb.com/api.php?",
  SessionReset = "https://opentdb.com/api_token.php?command=reset",
  SessionStart = "https://opentdb.com/api_token.php?command=request",
}
