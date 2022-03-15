enum CategoryNamesStrict {
  GENERAL_KNOWLEDGE = 9,
  ENTERTAINMENT_BOOKS,
  ENTERTAINMENT_FILM,
  ENTERTAINMENT_MUSIC,
  ENTERTAINMENT_MUSICALS_AND_THEATRES,
  ENTERTAINMENT_TELEVISION,
  ENTERTAINMENT_VIDEO_GAMES,
  ENTERTAINMENT_BOARD_GAMES,
  SCIENCE_AND_NATURE,
  SCIENCE_COMPUTERS,
  SCIENCE_MATHEMATICS,
  MYTHOLOGY,
  SPORTS,
  GEOGRAPHY,
  HISTORY,
  POLITICS,
  ART,
  CELEBRITIES,
  ANIMALS,
  VEHICLES,
  ENTERTAINMENT_COMICS,
  SCIENCE_GADGETS,
  ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA,
  ENTERTAINMENT_CARTOON_AND_ANIMATIONS
}

enum CategoryNamesPretty {
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
  "Entertainment: Cartoon and Animations"
}

enum CategoryNameVersions {
  Strict,
  Pretty
}

enum QuestionAmountRange {
  Min = 1,
  Max = 50
}

enum QuestionDifficulties {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}

enum QuestionTypes {
  multiple = 'multiple',
  boolean = 'boolean',
}

enum QuestionEncodings {
  base64 = 'base64',
  none = 'none',
  url3986 = 'url3986',
  urlLegacy = 'urlLegacy'
}

enum QuestionVersions {
  Raw,
  Final
}