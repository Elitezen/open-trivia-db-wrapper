/**
 * All strict category names mapped to their API id
 * @enum
 */
export enum CategoryNamesStrict {
  GeneralKnowledge = 9,
  EntertainmentBooks,
  EntertainmentFilm,
  EntertainmentMusic,
  EntertainmentMusicalsAndTheatres,
  EntertainmentJapaneseAnimeAndManga,
  EntertainmentCartoonAndAnimations,
  EntertainmentTelevision,
  EntertainmentVideoGames,
  EntertainmentBoardGames,
  EntertainmentComics,
  ScienceAndNature,
  ScienceComputers,
  ScienceMathmatics,
  ScienceGadgets,
  Mythology,
  Sports,
  Geography,
  History,
  Politics,
  Art,
  Celebrities,
  Animals,
  Vehicles
}

/**
 * All pretty category names mapped to their API id
 * @enum
 */
export enum CategoryNamesPretty {
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

/**
 * The types of Category names
 * @enum
 */
export enum CategoryNameVersions {
  Strict,
  Pretty,
}

/**
 * The range of minimun to maximum questions allowed per API call
 * @enum
 */
export enum QuestionAmountRange {
  Min = 1,
  Max = 50,
}

/**
 * The question difficulties mapped to their API value
 * @enum
 */
export enum QuestionDifficulties {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * The question types mapped to their API value
 * @enum
 */
export enum QuestionTypes {
  Multiple = "multiple",
  Boolean = "boolean",
}

/**
 * The question encodings mapped to their API value
 * @enum
 */
export enum QuestionEncodings {
  Base64 = "base64",
  None = "none",
  Url3986 = "url3986",
  UrlLegacy = "urlLegacy",
}

/**
 * The types of Category versions
 * @enum
 */
export enum QuestionVersions {
  Raw,
  Final,
}

export enum CategoryType {
  Id = "ID",
  Name = "NAME"
};
