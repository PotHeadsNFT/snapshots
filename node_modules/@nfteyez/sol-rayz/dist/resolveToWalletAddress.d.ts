import { PublicKey, Connection } from "@solana/web3.js";
import { StringPublicKey } from "./types";
export declare const SOL_TLD_AUTHORITY: PublicKey;
export declare const getInputKey: (input: any) => Promise<{
    inputDomainKey: PublicKey;
    hashedInputName: Buffer;
}>;
declare type Props = {
    /**
     * Text to be resolved to Solana wallet Public Key,
     * For now it resolves Solana Domain Names.
     * If Solana address passed it is validated and send back
     */
    text: string;
    /**
     * Optional Connection object.
     * Required for production use.
     * W/o it will connect to Mainnet-Beta
     */
    connection?: Connection;
};
/**
 * Fn to resolve text into Solana wallet Public Key,
 * For now it resolves Solana Domain Names.
 * If Solana address passed it is validated and send back.
 *
 * Throw error if input text can't be resolved and validated.
 */
export declare const resolveToWalletAddress: ({ text: rawText, connection, }: Props) => Promise<StringPublicKey>;
export {};
//# sourceMappingURL=resolveToWalletAddress.d.ts.map