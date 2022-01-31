"use strict";
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
exports.resolveToWalletAddress = exports.getInputKey = exports.SOL_TLD_AUTHORITY = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_name_service_1 = require("@solana/spl-name-service");
var utils_1 = require("./utils");
// Address of the SOL TLD
exports.SOL_TLD_AUTHORITY = new web3_js_1.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx");
var getInputKey = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedInputName, inputDomainKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, spl_name_service_1.getHashedName)(input)];
            case 1:
                hashedInputName = _a.sent();
                return [4 /*yield*/, (0, spl_name_service_1.getNameAccountKey)(hashedInputName, undefined, exports.SOL_TLD_AUTHORITY)];
            case 2:
                inputDomainKey = _a.sent();
                return [2 /*return*/, { inputDomainKey: inputDomainKey, hashedInputName: hashedInputName }];
        }
    });
}); };
exports.getInputKey = getInputKey;
var errorCantResolve = new Error("Can't resolve provided name into valid Solana address =(");
/**
 * Fn to resolve text into Solana wallet Public Key,
 * For now it resolves Solana Domain Names.
 * If Solana address passed it is validated and send back.
 *
 * Throw error if input text can't be resolved and validated.
 */
var resolveToWalletAddress = function (_a) {
    var rawText = _a.text, _b = _a.connection, connection = _b === void 0 ? (0, utils_1.createConnectionConfig)() : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var input, isValidSolana, inputLowerCased, isSolDamain, domainName, inputDomainKey, registry, owner;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    input = (_c = rawText === null || rawText === void 0 ? void 0 : rawText.trim) === null || _c === void 0 ? void 0 : _c.call(rawText);
                    // throw and error if input is not provided
                    if (!input) {
                        return [2 /*return*/, Promise.reject(errorCantResolve)];
                    }
                    isValidSolana = (0, utils_1.isValidSolanaAddress)(input);
                    if (isValidSolana) {
                        return [2 /*return*/, Promise.resolve(input)];
                    }
                    inputLowerCased = input === null || input === void 0 ? void 0 : input.toLowerCase();
                    isSolDamain = (_d = inputLowerCased === null || inputLowerCased === void 0 ? void 0 : inputLowerCased.endsWith) === null || _d === void 0 ? void 0 : _d.call(inputLowerCased, ".sol");
                    if (!isSolDamain) return [3 /*break*/, 3];
                    domainName = inputLowerCased.split(".sol")[0];
                    return [4 /*yield*/, (0, exports.getInputKey)(domainName)];
                case 1:
                    inputDomainKey = (_g.sent()).inputDomainKey;
                    return [4 /*yield*/, spl_name_service_1.NameRegistryState.retrieve(connection, inputDomainKey)];
                case 2:
                    registry = _g.sent();
                    owner = (_f = (_e = registry === null || registry === void 0 ? void 0 : registry.owner) === null || _e === void 0 ? void 0 : _e.toBase58) === null || _f === void 0 ? void 0 : _f.call(_e);
                    if (owner) {
                        return [2 /*return*/, Promise.resolve(owner)];
                    }
                    _g.label = 3;
                case 3: 
                // throw error if had no luck get valid Solana address
                return [2 /*return*/, Promise.reject(errorCantResolve)];
            }
        });
    });
};
exports.resolveToWalletAddress = resolveToWalletAddress;
//# sourceMappingURL=resolveToWalletAddress.js.map