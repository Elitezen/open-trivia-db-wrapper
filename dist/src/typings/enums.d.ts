export declare enum CategoryNames {
    "General Knowledge" = 9,
    "Entertainment: Books" = 10,
    "Entertainment: Film" = 11,
    "Entertainment: Music" = 12,
    "Entertainment: Musicals & Theatres" = 13,
    "Entertainment: Television" = 14,
    "Entertainment: Video Games" = 15,
    "Entertainment: Board Games" = 16,
    "Science & Nature" = 17,
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
    "Entertainment: Japanese Anime & Manga" = 31,
    "Entertainment: Cartoon & Animations" = 32
}
export declare enum QuestionDifficulties {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
export declare enum QuestionEncodings {
    Base64 = "base64",
    None = "none",
    Url3986 = "url3986",
    UrlLegacy = "urlLegacy"
}
export declare enum QuestionTypes {
    Multiple = "multiple",
    Boolean = "boolean"
}
export declare enum Routes {
    Category = "https://opentdb.com/api_count.php?",
    Questions = "https://opentdb.com/api.php?",
    SessionReset = "",
    SessionStart = "https://opentdb.com/api_token.php?command=request"
}
