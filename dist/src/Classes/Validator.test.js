"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("./Validator");
function createInstance(options) {
    return new Validator_1.default(options);
}
test("tests output of Validator.checkAmount()", function () {
    var validator = createInstance({ amount: {} });
    expect(function () {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: true });
    expect(function () {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: "" });
    expect(function () {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 0 });
    expect(function () {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 51 });
    expect(function () {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 25 });
    expect(validator.checkAmount()).toEqual(25);
    validator = createInstance({ amount: "25" });
    expect(validator.checkAmount()).toEqual(25);
    validator = createInstance({ amount: undefined });
    expect(validator.checkAmount()).toEqual(null);
    validator = createInstance({ amount: null });
    expect(validator.checkAmount()).toEqual(null);
});
test("tests output of Validator.checkCategory()", function () {
    var validator = createInstance({ category: {} });
    expect(function () {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: true });
    expect(function () {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: "..." });
    expect(function () {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 8 });
    expect(function () {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 33 });
    expect(function () {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 25 });
    expect(validator.checkCategory()).toEqual(25);
    validator = createInstance({ category: "25" });
    expect(validator.checkCategory()).toEqual(25);
    validator = createInstance({ category: "GENERAL_KNOWLEDGE" });
    expect(validator.checkCategory()).toEqual(9);
    validator = createInstance({
        category: "ENTERTAINMENT_CARTOON_AND_ANIMATIONS",
    });
    expect(validator.checkCategory()).toEqual(32);
    validator = createInstance({ category: "General Knowledge" });
    expect(validator.checkCategory()).toEqual(9);
    validator = createInstance({
        category: "Entertainment: Cartoon and Animations",
    });
    expect(validator.checkCategory()).toEqual(32);
    validator = createInstance({ category: undefined });
    expect(validator.checkCategory()).toEqual(null);
    validator = createInstance({ category: null });
    expect(validator.checkCategory()).toEqual(null);
});
test("tests output of Validator.checkDifficulty()", function () {
    var validator = createInstance({
        difficulty: {},
    });
    expect(function () {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: true,
    });
    expect(function () {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({ difficulty: "..." });
    expect(function () {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: 1,
    });
    expect(function () {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: "1",
    });
    expect(function () {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({ difficulty: "easy" });
    expect(validator.checkDifficulty()).toEqual("easy");
    validator = createInstance({ difficulty: undefined });
    expect(validator.checkDifficulty()).toEqual(null);
    validator = createInstance({ difficulty: null });
    expect(validator.checkDifficulty()).toEqual(null);
});
test("tests output of Validator.checkEncoding()", function () {
    var validator = createInstance({
        encode: {},
    });
    expect(function () {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: true,
    });
    expect(function () {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({ encode: "..." });
    expect(function () {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: 1,
    });
    expect(function () {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: "1",
    });
    expect(function () {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({ encode: "base64" });
    expect(validator.checkEncode()).toEqual("base64");
    validator = createInstance({ encode: undefined });
    expect(validator.checkEncode()).toEqual(null);
    validator = createInstance({ encode: null });
    expect(validator.checkEncode()).toEqual(null);
});
test("tests output of Validator.checkToken()", function () {
    var validator = createInstance({
        session: {},
    });
    expect(function () {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({
        session: true,
    });
    expect(function () {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({ session: "" });
    expect(function () {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({
        session: 1,
    });
    expect(function () {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({ session: "..." });
    expect(validator.checkToken()).toEqual("...");
    validator = createInstance({ session: undefined });
    expect(validator.checkToken()).toEqual(null);
    validator = createInstance({ session: null });
    expect(validator.checkToken()).toEqual(null);
});
test("tests output of Validator.checkType()", function () {
    var validator = createInstance({
        type: {},
    });
    expect(function () {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({
        type: true,
    });
    expect(function () {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({ type: "..." });
    expect(function () {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({
        type: 1,
    });
    expect(function () {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({ type: "boolean" });
    expect(validator.checkType()).toEqual("boolean");
    validator = createInstance({ type: undefined });
    expect(validator.checkType()).toEqual(null);
    validator = createInstance({ type: null });
    expect(validator.checkType()).toEqual(null);
});
