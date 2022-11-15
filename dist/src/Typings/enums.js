"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryType = exports.QuestionVersions = exports.QuestionEncodings = exports.QuestionTypes = exports.QuestionDifficulties = exports.QuestionAmountRange = exports.CategoryNameVersions = exports.CategoryNamesPretty = exports.CategoryNamesStrict = void 0;
/**
 * All strict category names mapped to their API id
 * @enum
 */
var CategoryNamesStrict;
(function (CategoryNamesStrict) {
    CategoryNamesStrict[CategoryNamesStrict["GeneralKnowledge"] = 9] = "GeneralKnowledge";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentBooks"] = 10] = "EntertainmentBooks";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentFilm"] = 11] = "EntertainmentFilm";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentMusic"] = 12] = "EntertainmentMusic";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentMusicalsAndTheatres"] = 13] = "EntertainmentMusicalsAndTheatres";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentJapaneseAnimeAndManga"] = 14] = "EntertainmentJapaneseAnimeAndManga";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentCartoonAndAnimations"] = 15] = "EntertainmentCartoonAndAnimations";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentTelevision"] = 16] = "EntertainmentTelevision";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentVideoGames"] = 17] = "EntertainmentVideoGames";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentBoardGames"] = 18] = "EntertainmentBoardGames";
    CategoryNamesStrict[CategoryNamesStrict["EntertainmentComics"] = 19] = "EntertainmentComics";
    CategoryNamesStrict[CategoryNamesStrict["ScienceAndNature"] = 20] = "ScienceAndNature";
    CategoryNamesStrict[CategoryNamesStrict["ScienceComputers"] = 21] = "ScienceComputers";
    CategoryNamesStrict[CategoryNamesStrict["ScienceMathmatics"] = 22] = "ScienceMathmatics";
    CategoryNamesStrict[CategoryNamesStrict["ScienceGadgets"] = 23] = "ScienceGadgets";
    CategoryNamesStrict[CategoryNamesStrict["Mythology"] = 24] = "Mythology";
    CategoryNamesStrict[CategoryNamesStrict["Sports"] = 25] = "Sports";
    CategoryNamesStrict[CategoryNamesStrict["Geography"] = 26] = "Geography";
    CategoryNamesStrict[CategoryNamesStrict["History"] = 27] = "History";
    CategoryNamesStrict[CategoryNamesStrict["Politics"] = 28] = "Politics";
    CategoryNamesStrict[CategoryNamesStrict["Art"] = 29] = "Art";
    CategoryNamesStrict[CategoryNamesStrict["Celebrities"] = 30] = "Celebrities";
    CategoryNamesStrict[CategoryNamesStrict["Animals"] = 31] = "Animals";
    CategoryNamesStrict[CategoryNamesStrict["Vehicles"] = 32] = "Vehicles";
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
    QuestionDifficulties["Easy"] = "easy";
    QuestionDifficulties["Medium"] = "medium";
    QuestionDifficulties["Hard"] = "hard";
})(QuestionDifficulties = exports.QuestionDifficulties || (exports.QuestionDifficulties = {}));
/**
 * The question types mapped to their API value
 * @enum
 */
var QuestionTypes;
(function (QuestionTypes) {
    QuestionTypes["Multiple"] = "multiple";
    QuestionTypes["Boolean"] = "boolean";
})(QuestionTypes = exports.QuestionTypes || (exports.QuestionTypes = {}));
/**
 * The question encodings mapped to their API value
 * @enum
 */
var QuestionEncodings;
(function (QuestionEncodings) {
    QuestionEncodings["Base64"] = "base64";
    QuestionEncodings["None"] = "none";
    QuestionEncodings["Url3986"] = "url3986";
    QuestionEncodings["UrlLegacy"] = "urlLegacy";
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
var CategoryType;
(function (CategoryType) {
    CategoryType["Id"] = "ID";
    CategoryType["Name"] = "NAME";
})(CategoryType = exports.CategoryType || (exports.CategoryType = {}));
;
