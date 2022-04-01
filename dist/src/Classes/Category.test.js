"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = require("./Category");
function createInstance(arg) {
    return new Category_1.default(arg);
}
test("Ensure instance creations of Category throw errors when the argument is not a CategoryResolvable", function () {
    expect(function () { return createInstance(8); }).toThrow(Error);
    expect(function () { return createInstance(33); }).toThrow(Error);
    expect(function () { return createInstance("text"); }).toThrow(Error);
    expect(function () { return createInstance(true); }).toThrow(Error);
    expect(function () { return createInstance({}); }).toThrow(Error);
});
test("Test outputs of Category.idToStrictName()", function () {
    expect(Category_1.default.idToStrictName(8)).toBe(null);
    expect(Category_1.default.idToStrictName(33)).toBe(null);
    expect(Category_1.default.idToStrictName("text")).toBe(null);
    expect(Category_1.default.idToStrictName(true)).toBe(null);
    expect(Category_1.default.idToStrictName(9)).toBe("GENERAL_KNOWLEDGE");
    expect(Category_1.default.idToStrictName(18)).toBe("SCIENCE_COMPUTERS");
    expect(Category_1.default.idToStrictName("18")).toBe("SCIENCE_COMPUTERS");
    expect(Category_1.default.idToStrictName(32)).toBe("ENTERTAINMENT_CARTOON_AND_ANIMATIONS");
});
test("Test outputs of Category.idToPrettyName()", function () {
    expect(Category_1.default.idToPrettyName(8)).toBe(null);
    expect(Category_1.default.idToPrettyName(33)).toBe(null);
    expect(Category_1.default.idToPrettyName("text")).toBe(null);
    expect(Category_1.default.idToPrettyName(true)).toBe(null);
    expect(Category_1.default.idToPrettyName(9)).toBe("General Knowledge");
    expect(Category_1.default.idToPrettyName(18)).toBe("Science: Computers");
    expect(Category_1.default.idToPrettyName("18")).toBe("Science: Computers");
    expect(Category_1.default.idToPrettyName(32)).toBe("Entertainment: Cartoon and Animations");
});
test("Test outputs of Category.nameToId()", function () {
    expect(Category_1.default.nameToId("8")).toBe(null);
    expect(Category_1.default.nameToId("33")).toBe(null);
    expect(Category_1.default.nameToId(15)).toBe(null);
    expect(Category_1.default.nameToId("text")).toBe(null);
    expect(Category_1.default.nameToId(true)).toBe(null);
    expect(Category_1.default.nameToId("General Knowledge")).toBe(9);
    expect(Category_1.default.nameToId("GENERAL_KNOWLEDGE")).toBe(9);
    expect(Category_1.default.nameToId("Science: Computers")).toBe(18);
    expect(Category_1.default.nameToId("SCIENCE_COMPUTERS")).toBe(18);
    expect(Category_1.default.nameToId("Entertainment: Cartoon and Animations")).toBe(32);
    expect(Category_1.default.nameToId("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(32);
});
test("Test outputs of Category.isIdResolvable()", function () {
    expect(Category_1.default.isIdResolvable("8")).toBe(false);
    expect(Category_1.default.isIdResolvable(8)).toBe(false);
    expect(Category_1.default.isIdResolvable("33")).toBe(false);
    expect(Category_1.default.isIdResolvable(33)).toBe(false);
    expect(Category_1.default.isIdResolvable("15")).toBe(true);
    expect(Category_1.default.isIdResolvable(15)).toBe(true);
    expect(Category_1.default.isIdResolvable("text")).toBe(false);
    expect(Category_1.default.isIdResolvable(true)).toBe(false);
    expect(Category_1.default.isIdResolvable("General Knowledge")).toBe(false);
    expect(Category_1.default.isIdResolvable("GENERAL_KNOWLEDGE")).toBe(false);
});
test("Test outputs of Category.isNameResolvable()", function () {
    expect(Category_1.default.isNameResolvable("8")).toBe(false);
    expect(Category_1.default.isNameResolvable(8)).toBe(false);
    expect(Category_1.default.isNameResolvable("33")).toBe(false);
    expect(Category_1.default.isNameResolvable(33)).toBe(false);
    expect(Category_1.default.isNameResolvable("15")).toBe(false);
    expect(Category_1.default.isNameResolvable(15)).toBe(false);
    expect(Category_1.default.isNameResolvable("text")).toBe(false);
    expect(Category_1.default.isNameResolvable(true)).toBe(false);
    expect(Category_1.default.isNameResolvable("General Knowledge")).toBe(true);
    expect(Category_1.default.isNameResolvable("GENERAL_KNOWLEDGE")).toBe(true);
    expect(Category_1.default.isNameResolvable("Entertainment: Cartoon and Animations")).toBe(true);
    expect(Category_1.default.isNameResolvable("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(true);
});
test("Test outputs of Category.prettyToStrictName()", function () {
    expect(Category_1.default.prettyToStrictName("8")).toBe(null);
    expect(Category_1.default.prettyToStrictName(8)).toBe(null);
    expect(Category_1.default.prettyToStrictName("33")).toBe(null);
    expect(Category_1.default.prettyToStrictName(33)).toBe(null);
    expect(Category_1.default.prettyToStrictName("15")).toBe(null);
    expect(Category_1.default.prettyToStrictName(15)).toBe(null);
    expect(Category_1.default.prettyToStrictName("text")).toBe(null);
    expect(Category_1.default.prettyToStrictName(true)).toBe(null);
    expect(Category_1.default.prettyToStrictName("General Knowledge")).toBe("GENERAL_KNOWLEDGE");
    expect(Category_1.default.prettyToStrictName("GENERAL_KNOWLEDGE")).toBe(null);
    expect(Category_1.default.prettyToStrictName("Entertainment: Cartoon and Animations")).toBe("ENTERTAINMENT_CARTOON_AND_ANIMATIONS");
    expect(Category_1.default.prettyToStrictName("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(null);
});
test("Test outputs of Category.strictToPrettyName()", function () {
    expect(Category_1.default.strictToPrettyName("8")).toBe(null);
    expect(Category_1.default.strictToPrettyName(8)).toBe(null);
    expect(Category_1.default.strictToPrettyName("33")).toBe(null);
    expect(Category_1.default.strictToPrettyName(33)).toBe(null);
    expect(Category_1.default.strictToPrettyName("15")).toBe(null);
    expect(Category_1.default.strictToPrettyName(15)).toBe(null);
    expect(Category_1.default.strictToPrettyName("text")).toBe(null);
    expect(Category_1.default.strictToPrettyName(true)).toBe(null);
    expect(Category_1.default.strictToPrettyName("General Knowledge")).toBe(null);
    expect(Category_1.default.strictToPrettyName("GENERAL_KNOWLEDGE")).toBe("General Knowledge");
    expect(Category_1.default.strictToPrettyName("Entertainment: Cartoon and Animations")).toBe(null);
    expect(Category_1.default.strictToPrettyName("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe("Entertainment: Cartoon and Animations");
});
test("Tests outputs for Category.random()", function () {
    expect(Category_1.default.random(1)).toBeGreaterThanOrEqual(9);
    expect(Category_1.default.random(1)).toBeLessThanOrEqual(32);
    expect(Category_1.default.random({})).toBeGreaterThanOrEqual(9);
    expect(Category_1.default.random({})).toBeLessThanOrEqual(32);
    expect(Category_1.default.random(true)).toBeGreaterThanOrEqual(9);
    expect(Category_1.default.random(true)).toBeLessThanOrEqual(32);
    expect(Category_1.default.random("ID")).toBeGreaterThanOrEqual(9);
    expect(Category_1.default.random("ID")).toBeLessThanOrEqual(32);
    expect(typeof Category_1.default.random("NAME")).toBe("string");
});
test("Tests outputs for Category.resolve()", function () {
    expect(Category_1.default.resolve(8)).toBe(null);
    expect(Category_1.default.resolve(33)).toBe(null);
    expect(Category_1.default.resolve(true)).toBe(null);
    expect(Category_1.default.resolve({})).toBe(null);
    expect(Category_1.default.resolve("")).toBe(null);
    expect(Category_1.default.resolve(9)).toBeInstanceOf(Category_1.default);
    expect(Category_1.default.resolve(32)).toBeInstanceOf(Category_1.default);
    expect(Category_1.default.resolve("SCIENCE_COMPUTERS")).toBeInstanceOf(Category_1.default);
    expect(Category_1.default.resolve("Science: Computers")).toBeInstanceOf(Category_1.default);
});
test("Tests outputs for Category.getData()", function () {
    var myCategory = createInstance(9);
    expect(myCategory.getData().then(function (res) { return typeof res; })).resolves.toBe("object");
});
test("Tests outputs for Category.getQuestions()", function () {
    var myCategory = createInstance(9);
    expect(myCategory.fetchQuestions().then(function (res) { return typeof res; })).resolves.toBe("object");
});
