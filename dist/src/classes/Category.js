"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../typings/enums");
var getCategory_1 = require("../functions/getCategory");
var Util_1 = require("./Util");
/**
 * @class Class for anything trivia category related.
 */
var Category = /** @class */ (function () {
    function Category() {
    }
    /**
     * Decodes a URLLegacy, URL3968 or Base64 category name.
     * @param {string} str string to decode.
     * @returns {string} The decoded category name.
     */
    Category.decodeEncodedCategoryName = function (str) {
        return ([
            Util_1.default.decodeBase64(str),
            Util_1.default.decodeUrl3968(str),
            Util_1.default.decodeUrlLegacy(str),
        ].find(function (str) { return Category.allNames.includes(str); }) || null);
    };
    /**
     * Returns a category id when given it's name.
     * @param {CategoryNameType} name The name of the category.
     * @returns {number | null} The id if resolvable.
     */
    Category.idByName = function (name) {
        var id = Category.allNames.indexOf(name);
        return id > -1 ? id + 9 : null;
    };
    /**
     * Returns a category name when given it's id.
     * @param {number} id The id of the category.
     * @returns {CategoryNameType | null} The name if resolvable.
     */
    Category.nameById = function (id) {
        var name = Category.allNames[id - 9];
        return name !== undefined ? name : null;
    };
    Category.random = function (resolvableType) {
        if (resolvableType === undefined)
            resolvableType = "name";
        var name = Category.allNames[Math.floor(Math.random() * Category.allNames.length)];
        if (resolvableType === "id")
            return Category.idByName(name);
        return name;
    };
    /**
     * An array of all category names. Use `Category.random()` for a random pick.
     */
    Category.allNames = Object.keys(enums_1.CategoryNames).filter(function (key) { return isNaN(+key); });
    /**
     * Fetches a trivia category's data. Duplicate of `getCategory()`.
     * @param {CategoryResolvable} arg An argument resolving to a trivia category.
     * @returns {Promise<CategoryData>} The data of the category.
     */
    Category.getCategory = getCategory_1.default;
    return Category;
}());
exports.default = Category;
