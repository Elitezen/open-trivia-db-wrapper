"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var Category = /** @class */ (function () {
    function Category(arg) {
        if (Category.isIdResolvable(arg)) {
            this.id = Number(arg);
        }
        else if (Category.isNameResolvable(arg)) {
            this.id = Category.nameToId(arg);
        }
        else {
            throw new Errors_1.EasyTriviaError('Given argument could not be resolved into a category', Errors_1.EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        }
        this.strictName = Category.idToStrictName(this.id);
        this.prettyName = Category.idToPrettyName(this.id);
    }
    Category.idToStrictName = function (arg) {
        if (!this.isIdResolvable(arg))
            return null;
        return this.allNames[Number(arg)];
    };
    Category.idToPrettyName = function (arg) {
        if (!this.isIdResolvable(arg))
            return null;
        var strictName = this.allNames[Number(arg)];
        return this.strictToPrettyName(strictName);
    };
    Category.nameToId = function (arg) {
        return (CategoryNamesStrict[arg]
            || CategoryNamesPretty[arg])
            || null;
    };
    Category.isIdResolvable = function (arg) {
        return !isNaN(+arg) && (9 <= arg && arg <= 32);
    };
    Category.isNameResolvable = function (arg) {
        return this.allNames.includes(arg) ||
            this.allNames.includes(this.prettyToStrictName(arg));
    };
    Category.prettyToStrictName = function (arg) {
        return this.idToStrictName(CategoryNamesPretty[arg]);
    };
    Category.strictToPrettyName = function (arg) {
        var id = CategoryNamesStrict[arg];
        var entries = Array.from(Object.entries(CategoryNamesPretty));
        var entry = entries.find(function (e) { return e[1] == id; });
        return entry ? entry[0] : null;
    };
    Category.allNames = Object.keys(CategoryNamesStrict);
    return Category;
}());
exports.default = Category;
console.log('Hit');
