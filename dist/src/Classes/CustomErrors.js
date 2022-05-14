"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTDBResponse = exports.OpenTDBError = void 0;
var OpenTDBUtil_1 = require("./OpenTDBUtil");
/**
 * @class Error class for library errors.
 * @extends TypeError
 */
var OpenTDBError = /** @class */ (function (_super) {
    __extends(OpenTDBError, _super);
    function OpenTDBError(message, header) {
        var _this = this;
        if (typeof message != "string")
            throw new OpenTDBError("Expected a string for 'message', recieved ".concat(typeof message), OpenTDBError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        if (typeof header != "string")
            throw new OpenTDBError("Expected a string for 'header', recieved ".concat(typeof header), OpenTDBError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        if (!message.length || !header.length)
            throw new OpenTDBError("Supplied strings must not be empty", OpenTDBError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        _this = _super.call(this, message) || this;
        _this.name = "OpenTDBError [".concat(header, "]");
        return _this;
    }
    OpenTDBError.errors = {
        headers: {
            EMPTY_RESPONSE: "EMPTY_RESPONSE",
            FAILED_REQUEST: "FAILED_REQUEST",
            INVALID_ARG: "INVALID_ARGUMENT",
            INVALID_CONSTRUCTOR_ARG: "INVALID_CONSTRUCTOR_ARGUMENT",
            INVALID_ID: "INVALID_ID",
            INVALID_NAME: "INVALID_CATEGORY_NAME",
            INVALID_OPT: "INVALID_OPTION",
            MISSING_OPT: "MISSING_OPTION",
            MISSING_ARG: "MISSING_ARGUMENT",
        },
    };
    return OpenTDBError;
}(TypeError));
exports.OpenTDBError = OpenTDBError;
/**
 * @class Error class for OpenTDB API response errors.
 * @extends Error
 */
var OpenTDBResponse = /** @class */ (function (_super) {
    __extends(OpenTDBResponse, _super);
    function OpenTDBResponse(errorCode) {
        var _this = this;
        if (errorCode < 0 || errorCode > 4)
            throw new OpenTDBError("The given number (".concat(errorCode, ") for 'errorCode' is not a valid OpenTDBResponseCode (range 0 - 4)"), OpenTDBError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        var _a = OpenTDBUtil_1.default.apiResponses[errorCode], name = _a.name, message = _a.message;
        _this = _super.call(this, message) || this;
        _this.name = "OpenTDBResponse [".concat(name, "]");
        return _this;
    }
    return OpenTDBResponse;
}(Error));
exports.OpenTDBResponse = OpenTDBResponse;
