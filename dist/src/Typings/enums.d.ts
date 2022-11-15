/**
 * All strict category names mapped to their API id
 * @enum
 */
export declare enum CategoryNamesStrict {
    GeneralKnowledge = 9,
    EntertainmentBooks = 10,
    EntertainmentFilm = 11,
    EntertainmentMusic = 12,
    EntertainmentMusicalsAndTheatres = 13,
    EntertainmentJapaneseAnimeAndManga = 14,
    EntertainmentCartoonAndAnimations = 15,
    EntertainmentTelevision = 16,
    EntertainmentVideoGames = 17,
    EntertainmentBoardGames = 18,
    EntertainmentComics = 19,
    ScienceAndNature = 20,
    ScienceComputers = 21,
    ScienceMathmatics = 22,
    ScienceGadgets = 23,
    Mythology = 24,
    Sports = 25,
    Geography = 26,
    History = 27,
    Politics = 28,
    Art = 29,
    Celebrities = 30,
    Animals = 31,
    Vehicles = 32
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
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
/**
 * The question types mapped to their API value
 * @enum
 */
export declare enum QuestionTypes {
    Multiple = "multiple",
    Boolean = "boolean"
}
/**
 * The question encodings mapped to their API value
 * @enum
 */
export declare enum QuestionEncodings {
    Base64 = "base64",
    None = "none",
    Url3986 = "url3986",
    UrlLegacy = "urlLegacy"
}
/**
 * The types of Category versions
 * @enum
 */
export declare enum QuestionVersions {
    Raw = 0,
    Final = 1
}
export declare enum CategoryType {
    Id = "ID",
    Name = "NAME"
}
