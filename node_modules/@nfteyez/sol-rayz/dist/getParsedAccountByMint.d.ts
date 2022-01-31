import { Connection } from "@solana/web3.js";
import { StringPublicKey } from "./types";
declare type Props = {
    /**
     * Mint public address
     */
    mintAddress: StringPublicKey;
    /**
     * Optionally provide your own connection object.
     * Otherwise createConnectionConfig() will be used
     */
    connection?: Connection;
    /**
     * Convert all PublicKey objects to string versions.
     * Default is true
     */
    stringifyPubKeys?: boolean;
};
/**
 * This fn look for the account associated with passed NFT token mint field.
 * This associated account holds some useful information like who is current owner of token.
 * it is stored within result.account.data.parsed.info.owner
 * Finding the token owner is main purpose of using this fn.
 */
export declare const getParsedAccountByMint: ({ mintAddress, connection, stringifyPubKeys, }: Props) => Promise<any>;
export {};
//# sourceMappingURL=getParsedAccountByMint.d.ts.map