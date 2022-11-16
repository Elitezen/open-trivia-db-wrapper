export enum CategoryNames {
  "General Knowledge" = 9,
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals and Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science and Nature",
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
  "Entertainment: Japanese Anime and Manga",
  "Entertainment: Cartoon and Animations",
}

export enum QuestionDifficulties {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum QuestionEncodings {
  Base64 = "base64",
  None = "none",
  Url3986 = "url3986",
  UrlLegacy = "urlLegacy",
}

export enum QuestionTypes {
  Multiple = 'multiple',
  Boolean = 'boolean'
}

export enum Routes {
  Questions = 'https://opentdb.com/api.php?',
  Category = 'https://opentdb.com/api_count.php?'
}