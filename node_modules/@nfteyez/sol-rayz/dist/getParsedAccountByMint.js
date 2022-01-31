"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getParsedAccountByMint = void 0;
var web3_js_1 = require("@solana/web3.js");
var solana_1 = require("./config/solana");
var utils_1 = require("./utils");
function isParsedAccountData(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.parsed) !== undefined;
}
/**
 * This fn look for the account associated with passed NFT token mint field.
 * This associated account holds some useful information like who is current owner of token.
 * it is stored within result.account.data.parsed.info.owner
 * Finding the token owner is main purpose of using this fn.
 */
var getParsedAccountByMint = function (_a) {
    var mintAddress = _a.mintAddress, _b = _a.connection, connection = _b === void 0 ? (0, utils_1.createConnectionConfig)() : _b, _c = _a.stringifyPubKeys, stringifyPubKeys = _c === void 0 ? true : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, positiveAmountResult, formatedData;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, connection.getParsedProgramAccounts(new web3_js_1.PublicKey(solana_1.TOKEN_PROGRAM), {
                        filters: [
                            { dataSize: 165 },
                            {
                                memcmp: {
                                    offset: 0,
                                    bytes: mintAddress,
                                },
                            },
                        ],
                    })];
                case 1:
                    res = _d.sent();
                    if (!(res === null || res === void 0 ? void 0 : res.length)) {
                        return [2 /*return*/, undefined];
                    }
                    positiveAmountResult = res === null || res === void 0 ? void 0 : res.find(function (_a) {
                        var _b, _c, _d;
                        var account = _a.account;
                        var data = account.data;
                        if (isParsedAccountData(data)) {
                            var amount = +((_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.parsed) === null || _b === void 0 ? void 0 : _b.info) === null || _c === void 0 ? void 0 : _c.tokenAmount) === null || _d === void 0 ? void 0 : _d.amount);
                            return amount;
                        }
                        return false;
                    });
                    formatedData = stringifyPubKeys
                        ? publicKeyToString(positiveAmountResult)
                        : positiveAmountResult;
                    return [2 /*return*/, formatedData];
            }
        });
    });
};
exports.getParsedAccountByMint = getParsedAccountByMint;
var publicKeyToString = function (tokenData) {
    var _a, _b, _c, _d;
    return (__assign(__assign({}, tokenData), { account: __assign(__assign({}, tokenData === null || tokenData === void 0 ? void 0 : tokenData.account), { owner: (_b = (_a = new web3_js_1.PublicKey(tokenData === null || tokenData === void 0 ? void 0 : tokenData.account.owner)) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a) }), pubkey: (_d = (_c = new web3_js_1.PublicKey(tokenData === null || tokenData === void 0 ? void 0 : tokenData.pubkey)) === null || _c === void 0 ? void 0 : _c.toString) === null || _d === void 0 ? void 0 : _d.call(_c) }));
};
//# sourceMappingURL=getParsedAccountByMint.js.map