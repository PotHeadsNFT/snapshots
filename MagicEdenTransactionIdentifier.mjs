import web3, { LAMPORTS_PER_SOL } from '@solana/web3.js';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

const programs = {
    me1: 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8',
    me2: 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K',
}

const wallets = {
    m1: 'GUfCR9mK6azb9vcpsxgXyj7XRPAKJd4KMHTTVvtncGgp',
    sysVar: 'SysvarRent111111111111111111111111111111111'
}

const solana = new web3.Connection(
    process.env.QUICKNODE_URL,
    'confirmed',
);

class MeSaleV1 {
    constructor(tx) {
        this.instructions = tx.instructions;
    }

    async details() {
        return {
            type: 'ME Sale',
            time: this.instructions[0].time,
            buyer: this.instructions[0].accounts[0].id,
            seller: this.instructions[0].accounts[2].id,
            price: (this.instructions[0].accounts[0].preBalance - this.instructions[0].accounts[0].postBalance),
        }
    }
}

class MeSaleV2 {
    constructor(tx) {
        this.instructions = tx.instructions;
    }

    async details() {
        return {
            type: 'ME Sale',
            time: this.instructions[0].time,
            buyer: this.instructions[0].accounts[0].id,
            seller: this.instructions[2].accounts[1].id,
            price: (this.instructions[0].accounts[0].preBalance - this.instructions[0].accounts[0].postBalance),
        }
    }
}

class MeListingV1 {
    constructor(tx) {
        this.instructions = tx.instructions;
    }

    async details() {
        return {
            type: 'ME Listing',
            time: this.instructions[0].time,
            seller: this.instructions[0].accounts[0].id,
        }
    }
}

class MeListingV2 {
    constructor(tx) {
        this.instructions = tx.instructions;
    }

    async details() {
        return {
            type: 'ME Listing',
            time: this.instructions[0].time,
            seller: this.instructions[0].accounts[0].id,
        }
    }
}

const fetchTransaction = async (txid, connection) => {
    return await connection.getTransaction(txid);
}

const resolveAccount = (accountIndex, tx) => {
    return {
        id: tx.transaction.message.accountKeys[accountIndex].toString(),
        preBalance: tx.meta.preBalances[accountIndex] / LAMPORTS_PER_SOL,
        postBalance: tx.meta.postBalances[accountIndex] / LAMPORTS_PER_SOL,
    }
}

const resolveProgram = (programIdIndex, tx) => {
    return tx.transaction.message.indexToProgramIds.get(programIdIndex).toString()
}

const fetchInstructions = (tx) => {
    tx.instructions = tx.transaction.message.instructions.map(instruction => {
        return {
            time: moment.unix(tx.blockTime),
            accounts: instruction.accounts.map(accountIndex => resolveAccount(accountIndex, tx)),
            program: resolveProgram(instruction.programIdIndex, tx),
            signature: tx.transaction.signatures
        }
    })
    
    return tx;
}

const isMe1 = (instructions) => {
    return instructions[0].program === programs.me1;
}

const isMe2 = (instructions) => {
    return instructions[0].program === programs.me2;
}

const isMe1Sale = async (tx) => {
    return isMe1(tx.instructions) && tx.instructions[0].accounts.find(account => account.id === wallets.m1)
        ? new MeSaleV1(tx).details()
        : false;
}

const isMe1Listing = async (tx) => {    
    return isMe1(tx.instructions) && tx.instructions[0].accounts.length === 5
        ? new MeListingV1(tx).details()
        : false;
}

const isMe2Sale = async (tx) => {    
    return isMe2(tx.instructions) && tx.instructions.length > 1 && tx.instructions[0].accounts[0].preBalance - tx.instructions[0].accounts[0].postBalance > 0.005
        ? new MeSaleV2(tx).details()
        : false;
}

const isMe2Listing = async (tx) => {    
    return isMe2(tx.instructions) && tx.instructions[0].accounts.length === 15 && tx.instructions[0].accounts[14].id === wallets.sysVar
        ? new MeListingV2(tx).details()
        : false;
}

const identifyTx = async (txid, connection = null) => {
    connection = connection || solana

    const tx = await fetchInstructions(
        await fetchTransaction(txid, connection)
    )

    return await isMe2Listing(tx) || await isMe1Listing(tx) || await isMe2Sale(tx)  || await isMe1Sale(tx);
}

export default identifyTx;
export {
    wallets,
    programs,
    solana
}