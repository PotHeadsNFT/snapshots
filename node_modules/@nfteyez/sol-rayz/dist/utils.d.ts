import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from "./config/metaplex";
export declare const decodeTokenMetadata: (buffer: Buffer) => Promise<Metadata>;
/**
 * Get Addresses of Metadata account assosiated with Mint Token
 */
export declare function getSolanaMetadataAddress(tokenMint: PublicKey): Promise<PublicKey>;
/**
 * Check if passed address is Solana address
 */
export declare const isValidSolanaAddress: (address: string) => boolean;
export declare const createConnectionConfig: (clusterApi?: string, commitment?: string) => Connection;
//# sourceMappingURL=utils.d.ts.map