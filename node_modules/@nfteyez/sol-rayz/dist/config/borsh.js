"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendBorsh = void 0;
var web3_js_1 = require("@solana/web3.js");
var borsh_1 = require("borsh");
var extendBorsh = function () {
    borsh_1.BinaryReader.prototype.readPubkey = function () {
        var reader = this;
        var array = reader.readFixedArray(32);
        return new web3_js_1.PublicKey(array);
    };
    borsh_1.BinaryWriter.prototype.writePubkey = function (value) {
        var writer = this;
        writer.writeFixedArray(value.toBuffer());
    };
};
exports.extendBorsh = extendBorsh;
(0, exports.extendBorsh)();
//# sourceMappingURL=borsh.js.map