/**
 * All strict category names mapped to their API id
 * @enum
 */
export declare enum CategoryNamesStrict {
    GENERAL_KNOWLEDGE = 9,
    ENTERTAINMENT_BOOKS = 10,
    ENTERTAINMENT_FILM = 11,
    ENTERTAINMENT_MUSIC = 12,
    ENTERTAINMENT_MUSICALS_AND_THEATRES = 13,
    ENTERTAINMENT_TELEVISION = 14,
    ENTERTAINMENT_VIDEO_GAMES = 15,
    ENTERTAINMENT_BOARD_GAMES = 16,
    SCIENCE_AND_NATURE = 17,
    SCIENCE_COMPUTERS = 18,
    SCIENCE_MATHEMATICS = 19,
    MYTHOLOGY = 20,
    SPORTS = 21,
    GEOGRAPHY = 22,
    HISTORY = 23,
    POLITICS = 24,
    ART = 25,
    CELEBRITIES = 26,
    ANIMALS = 27,
    VEHICLES = 28,
    ENTERTAINMENT_COMICS = 29,
    SCIENCE_GADGETS = 30,
    ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA = 31,
    ENTERTAINMENT_CARTOON_AND_ANIMATIONS = 32
}
/**
 * All pretty category names mapped to their API id
 * @enum
 */
export declare enum CategoryNamesPretty {
    "General Knowledge" = 9,
    "Entertainment: Books" = 10,
    "Entertainment: Film" = 11,
    "Entertainment: Music" = 12,
    "Entertainment: Musicals and Theatres" = 13,
    "Entertainment: Television" = 14,
    "Entertainment: Video Games" = 15,
    "Entertainment: Board Games" = 16,
    "Science and Nature" = 17,
    "Science: Computers" = 18,
    "Science Mathematics" = 19,
    "Mythology" = 20,
    "Sports" = 21,
    "Geography" = 22,
    "History" = 23,
    "Politics" = 24,
    "Art" = 25,
    "Celebrities" = 26,
    "Animals" = 27,
    "Vehicles" = 28,
    "Entertainment: Comics" = 29,
    "Science: Gadgets" = 30,
    "Entertainment: Japanese Anime and Manga" = 31,
    "Entertainment: Cartoon and Animations" = 32
}
/**
 * The types of Category names
 * @enum
 */
export declare enum CategoryNameVersions {
    Strict = 0,
    Pretty = 1
}
/**
 * The range of minimun to maximum questions allowed per API call
 * @enum
 */
export declare enum QuestionAmountRange {
    Min = 1,
    Max = 50
}
/**
 * The question difficulties mapped to their API value
 * @enum
 */
export declare enum QuestionDifficulties {
    easy = "easy",
    medium = "medium",
    hard = "hard"
}
/**
 * The question types mapped to their API value
 * @enum
 */
export declare enum QuestionTypes {
    multiple = "multiple",
    boolean = "boolean"
}
/**
 * The question encodings mapped to their API value
 * @enum
 */
export declare enum QuestionEncodings {
    base64 = "base64",
    none = "none",
    url3986 = "url3986",
    urlLegacy = "urlLegacy"
}
/**
 * The types of Category versions
 * @enum
 */
export declare enum QuestionVersions {
    Raw = 0,
    Final = 1
}
