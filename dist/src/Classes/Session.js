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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var CustomErrors_1 = require("./CustomErrors");
var OpenTDBUtil_1 = require("./OpenTDBUtil");
/**
 * @class Class for starting OpenTDB API sessions
 * */
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The current session token
         */
        _this.token = null;
        return _this;
    }
    /**
     * Starts a new trivia session and assigns the new token to `Session#token`.
     * @async
     * @returns {Promise<string>} The session token.
     */
    Session.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, oldToken, data, newToken, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = OpenTDBUtil_1.default.links.full.START_SESSION;
                        oldToken = this.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, OpenTDBUtil_1.default.openTDBRequest(url)];
                    case 2:
                        data = (_a.sent());
                        newToken = data.token;
                        if (newToken === null || oldToken == newToken) {
                            throw new CustomErrors_1.OpenTDBError("This trivia's session token unexpectedly failed to update", CustomErrors_1.OpenTDBError.errors.headers.FAILED_REQUEST);
                        }
                        else {
                            this.token = newToken;
                            return [2 /*return*/, this.token];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resets the current trivia session.
     * @async
     * @returns {Promise<string>} The current session token.
     */
    Session.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = OpenTDBUtil_1.default.links.base.RESET_SESSION + this.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, OpenTDBUtil_1.default.openTDBRequest(url)];
                    case 2:
                        data = (_a.sent());
                        return [2 /*return*/, data.token];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Sets `Session#token` to null */
    Session.prototype.end = function () {
        this.token = null;
    };
    return Session;
}(stream_1.EventEmitter));
exports.default = Session;
var x = new Session();
