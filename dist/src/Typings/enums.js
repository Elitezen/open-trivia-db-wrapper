"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionVersions = exports.QuestionEncodings = exports.QuestionTypes = exports.QuestionDifficulties = exports.QuestionAmountRange = exports.CategoryNameVersions = exports.CategoryNamesPretty = exports.CategoryNamesStrict = void 0;
/**
 * All strict category names mapped to their API id
 * @enum
 */
var CategoryNamesStrict;
(function (CategoryNamesStrict) {
    CategoryNamesStrict[CategoryNamesStrict["GENERAL_KNOWLEDGE"] = 9] = "GENERAL_KNOWLEDGE";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_BOOKS"] = 10] = "ENTERTAINMENT_BOOKS";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_FILM"] = 11] = "ENTERTAINMENT_FILM";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_MUSIC"] = 12] = "ENTERTAINMENT_MUSIC";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_MUSICALS_AND_THEATRES"] = 13] = "ENTERTAINMENT_MUSICALS_AND_THEATRES";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_TELEVISION"] = 14] = "ENTERTAINMENT_TELEVISION";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_VIDEO_GAMES"] = 15] = "ENTERTAINMENT_VIDEO_GAMES";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_BOARD_GAMES"] = 16] = "ENTERTAINMENT_BOARD_GAMES";
    CategoryNamesStrict[CategoryNamesStrict["SCIENCE_AND_NATURE"] = 17] = "SCIENCE_AND_NATURE";
    CategoryNamesStrict[CategoryNamesStrict["SCIENCE_COMPUTERS"] = 18] = "SCIENCE_COMPUTERS";
    CategoryNamesStrict[CategoryNamesStrict["SCIENCE_MATHEMATICS"] = 19] = "SCIENCE_MATHEMATICS";
    CategoryNamesStrict[CategoryNamesStrict["MYTHOLOGY"] = 20] = "MYTHOLOGY";
    CategoryNamesStrict[CategoryNamesStrict["SPORTS"] = 21] = "SPORTS";
    CategoryNamesStrict[CategoryNamesStrict["GEOGRAPHY"] = 22] = "GEOGRAPHY";
    CategoryNamesStrict[CategoryNamesStrict["HISTORY"] = 23] = "HISTORY";
    CategoryNamesStrict[CategoryNamesStrict["POLITICS"] = 24] = "POLITICS";
    CategoryNamesStrict[CategoryNamesStrict["ART"] = 25] = "ART";
    CategoryNamesStrict[CategoryNamesStrict["CELEBRITIES"] = 26] = "CELEBRITIES";
    CategoryNamesStrict[CategoryNamesStrict["ANIMALS"] = 27] = "ANIMALS";
    CategoryNamesStrict[CategoryNamesStrict["VEHICLES"] = 28] = "VEHICLES";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_COMICS"] = 29] = "ENTERTAINMENT_COMICS";
    CategoryNamesStrict[CategoryNamesStrict["SCIENCE_GADGETS"] = 30] = "SCIENCE_GADGETS";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA"] = 31] = "ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA";
    CategoryNamesStrict[CategoryNamesStrict["ENTERTAINMENT_CARTOON_AND_ANIMATIONS"] = 32] = "ENTERTAINMENT_CARTOON_AND_ANIMATIONS";
})(CategoryNamesStrict = exports.CategoryNamesStrict || (exports.CategoryNamesStrict = {}));
/**
 * All pretty category names mapped to their API id
 * @enum
 */
var CategoryNamesPretty;
(function (CategoryNamesPretty) {
    CategoryNamesPretty[CategoryNamesPretty["General Knowledge"] = 9] = "General Knowledge";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Books"] = 10] = "Entertainment: Books";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Film"] = 11] = "Entertainment: Film";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Music"] = 12] = "Entertainment: Music";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Musicals and Theatres"] = 13] = "Entertainment: Musicals and Theatres";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Television"] = 14] = "Entertainment: Television";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Video Games"] = 15] = "Entertainment: Video Games";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Board Games"] = 16] = "Entertainment: Board Games";
    CategoryNamesPretty[CategoryNamesPretty["Science and Nature"] = 17] = "Science and Nature";
    CategoryNamesPretty[CategoryNamesPretty["Science: Computers"] = 18] = "Science: Computers";
    CategoryNamesPretty[CategoryNamesPretty["Science Mathematics"] = 19] = "Science Mathematics";
    CategoryNamesPretty[CategoryNamesPretty["Mythology"] = 20] = "Mythology";
    CategoryNamesPretty[CategoryNamesPretty["Sports"] = 21] = "Sports";
    CategoryNamesPretty[CategoryNamesPretty["Geography"] = 22] = "Geography";
    CategoryNamesPretty[CategoryNamesPretty["History"] = 23] = "History";
    CategoryNamesPretty[CategoryNamesPretty["Politics"] = 24] = "Politics";
    CategoryNamesPretty[CategoryNamesPretty["Art"] = 25] = "Art";
    CategoryNamesPretty[CategoryNamesPretty["Celebrities"] = 26] = "Celebrities";
    CategoryNamesPretty[CategoryNamesPretty["Animals"] = 27] = "Animals";
    CategoryNamesPretty[CategoryNamesPretty["Vehicles"] = 28] = "Vehicles";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Comics"] = 29] = "Entertainment: Comics";
    CategoryNamesPretty[CategoryNamesPretty["Science: Gadgets"] = 30] = "Science: Gadgets";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Japanese Anime and Manga"] = 31] = "Entertainment: Japanese Anime and Manga";
    CategoryNamesPretty[CategoryNamesPretty["Entertainment: Cartoon and Animations"] = 32] = "Entertainment: Cartoon and Animations";
})(CategoryNamesPretty = exports.CategoryNamesPretty || (exports.CategoryNamesPretty = {}));
/**
 * The types of Category names
 * @enum
 */
var CategoryNameVersions;
(function (CategoryNameVersions) {
    CategoryNameVersions[CategoryNameVersions["Strict"] = 0] = "Strict";
    CategoryNameVersions[CategoryNameVersions["Pretty"] = 1] = "Pretty";
})(CategoryNameVersions = exports.CategoryNameVersions || (exports.CategoryNameVersions = {}));
/**
 * The range of minimun to maximum questions allowed per API call
 * @enum
 */
var QuestionAmountRange;
(function (QuestionAmountRange) {
    QuestionAmountRange[QuestionAmountRange["Min"] = 1] = "Min";
    QuestionAmountRange[QuestionAmountRange["Max"] = 50] = "Max";
})(QuestionAmountRange = exports.QuestionAmountRange || (exports.QuestionAmountRange = {}));
/**
 * The question difficulties mapped to their API value
 * @enum
 */
var QuestionDifficulties;
(function (QuestionDifficulties) {
    QuestionDifficulties["easy"] = "easy";
    QuestionDifficulties["medium"] = "medium";
    QuestionDifficulties["hard"] = "hard";
})(QuestionDifficulties = exports.QuestionDifficulties || (exports.QuestionDifficulties = {}));
/**
 * The question types mapped to their API value
 * @enum
 */
var QuestionTypes;
(function (QuestionTypes) {
    QuestionTypes["multiple"] = "multiple";
    QuestionTypes["boolean"] = "boolean";
})(QuestionTypes = exports.QuestionTypes || (exports.QuestionTypes = {}));
/**
 * The question encodings mapped to their API value
 * @enum
 */
var QuestionEncodings;
(function (QuestionEncodings) {
    QuestionEncodings["base64"] = "base64";
    QuestionEncodings["none"] = "none";
    QuestionEncodings["url3986"] = "url3986";
    QuestionEncodings["urlLegacy"] = "urlLegacy";
})(QuestionEncodings = exports.QuestionEncodings || (exports.QuestionEncodings = {}));
/**
 * The types of Category versions
 * @enum
 */
var QuestionVersions;
(function (QuestionVersions) {
    QuestionVersions[QuestionVersions["Raw"] = 0] = "Raw";
    QuestionVersions[QuestionVersions["Final"] = 1] = "Final";
})(QuestionVersions = exports.QuestionVersions || (exports.QuestionVersions = {}));
