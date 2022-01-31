import { Connection } from '@solana/web3.js';
export declare const createConnectionConfig: (clusterApi?: string, commitment?: string) => Connection;
export declare const getParsedNftAccountsByUpdateAuthority: ({ updateAuthority, connection, }: {
    updateAuthority: any;
    connection?: Connection;
}) => Promise<import("./config/metaplex").Metadata[]>;
//# sourceMappingURL=getParsedNftAccountsByUpdateAuthority.d.ts.map