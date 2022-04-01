"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomErrors_1 = require("./CustomErrors");
test("Ensure instance creations of EasyTriviaError throw errors when either arguments are not strings", function () {
    expect(function () {
        new CustomErrors_1.EasyTriviaError({}, {});
    }).toThrow(Error);
    expect(function () {
        new CustomErrors_1.EasyTriviaError(1, 1);
    }).toThrow(Error);
    expect(function () {
        new CustomErrors_1.EasyTriviaError(true, true);
    }).toThrow(Error);
    expect(function () {
        new CustomErrors_1.EasyTriviaError("", "");
    }).toThrow(Error);
    expect(new CustomErrors_1.EasyTriviaError("...", "...")).toBeInstanceOf(Error);
});
test("Ensure instance creations of OpenTDBResponse throw errors when given argument is not a number between 0-4", function () {
    expect(function () {
        new CustomErrors_1.OpenTDBResponse(-1);
    }).toThrow(Error);
    expect(function () {
        new CustomErrors_1.OpenTDBResponse(5);
    }).toThrow(Error);
    expect(new CustomErrors_1.OpenTDBResponse(1)).toBeInstanceOf(Error);
});
