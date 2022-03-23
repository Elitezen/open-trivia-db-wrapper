"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCategoryData_1 = require("./getCategoryData");
test("Tests outputs of getCategoryData()", function () {
    expect((0, getCategoryData_1.default)("")).rejects.toThrow(Error);
    expect((0, getCategoryData_1.default)(8)).rejects.toThrow(Error);
    expect((0, getCategoryData_1.default)(33)).rejects.toThrow(Error);
    expect((0, getCategoryData_1.default)(true)).rejects.toThrow(Error);
    expect((0, getCategoryData_1.default)({})).rejects.toThrow(Error);
    // expect(getCategoryData(15).then(res => typeof res)).toBe('object');
});
