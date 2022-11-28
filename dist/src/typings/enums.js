"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.QuestionTypes = exports.QuestionEncodings = exports.QuestionDifficulties = exports.CategoryNames = void 0;
var CategoryNames;
(function (CategoryNames) {
    CategoryNames[CategoryNames["General Knowledge"] = 9] = "General Knowledge";
    CategoryNames[CategoryNames["Entertainment: Books"] = 10] = "Entertainment: Books";
    CategoryNames[CategoryNames["Entertainment: Film"] = 11] = "Entertainment: Film";
    CategoryNames[CategoryNames["Entertainment: Music"] = 12] = "Entertainment: Music";
    CategoryNames[CategoryNames["Entertainment: Musicals & Theatres"] = 13] = "Entertainment: Musicals & Theatres";
    CategoryNames[CategoryNames["Entertainment: Television"] = 14] = "Entertainment: Television";
    CategoryNames[CategoryNames["Entertainment: Video Games"] = 15] = "Entertainment: Video Games";
    CategoryNames[CategoryNames["Entertainment: Board Games"] = 16] = "Entertainment: Board Games";
    CategoryNames[CategoryNames["Science & Nature"] = 17] = "Science & Nature";
    CategoryNames[CategoryNames["Science: Computers"] = 18] = "Science: Computers";
    CategoryNames[CategoryNames["Science Mathematics"] = 19] = "Science Mathematics";
    CategoryNames[CategoryNames["Mythology"] = 20] = "Mythology";
    CategoryNames[CategoryNames["Sports"] = 21] = "Sports";
    CategoryNames[CategoryNames["Geography"] = 22] = "Geography";
    CategoryNames[CategoryNames["History"] = 23] = "History";
    CategoryNames[CategoryNames["Politics"] = 24] = "Politics";
    CategoryNames[CategoryNames["Art"] = 25] = "Art";
    CategoryNames[CategoryNames["Celebrities"] = 26] = "Celebrities";
    CategoryNames[CategoryNames["Animals"] = 27] = "Animals";
    CategoryNames[CategoryNames["Vehicles"] = 28] = "Vehicles";
    CategoryNames[CategoryNames["Entertainment: Comics"] = 29] = "Entertainment: Comics";
    CategoryNames[CategoryNames["Science: Gadgets"] = 30] = "Science: Gadgets";
    CategoryNames[CategoryNames["Entertainment: Japanese Anime & Manga"] = 31] = "Entertainment: Japanese Anime & Manga";
    CategoryNames[CategoryNames["Entertainment: Cartoon & Animations"] = 32] = "Entertainment: Cartoon & Animations";
})(CategoryNames = exports.CategoryNames || (exports.CategoryNames = {}));
var QuestionDifficulties;
(function (QuestionDifficulties) {
    QuestionDifficulties["Easy"] = "easy";
    QuestionDifficulties["Medium"] = "medium";
    QuestionDifficulties["Hard"] = "hard";
})(QuestionDifficulties = exports.QuestionDifficulties || (exports.QuestionDifficulties = {}));
var QuestionEncodings;
(function (QuestionEncodings) {
    QuestionEncodings["Base64"] = "base64";
    QuestionEncodings["None"] = "none";
    QuestionEncodings["Url3986"] = "url3986";
    QuestionEncodings["UrlLegacy"] = "urlLegacy";
})(QuestionEncodings = exports.QuestionEncodings || (exports.QuestionEncodings = {}));
var QuestionTypes;
(function (QuestionTypes) {
    QuestionTypes["Multiple"] = "multiple";
    QuestionTypes["Boolean"] = "boolean";
})(QuestionTypes = exports.QuestionTypes || (exports.QuestionTypes = {}));
var Routes;
(function (Routes) {
    Routes["Category"] = "https://opentdb.com/api_count.php?";
    Routes["Questions"] = "https://opentdb.com/api.php?";
    Routes["SessionReset"] = "";
    Routes["SessionStart"] = "https://opentdb.com/api_token.php?command=request";
})(Routes = exports.Routes || (exports.Routes = {}));
