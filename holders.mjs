import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import chalk from 'chalk'
import web3, {PublicKey} from '@solana/web3.js';
import identifyTx, {wallets, solana} from './MagicEdenTransactionIdentifier.mjs';
import dotenv from 'dotenv';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import fetch from "node-fetch";



dotenv.config('./.env');

const n = (val, color = null) => {
    const str = String('  ' + val).slice(-2);

    return color ? chalk[color](str) : str;
}

const latestListing = async (mint, owner = null, cutoff = '1970-01-01') => {
    let listings = await solana.getConfirmedSignaturesForAddress2(
        new web3.PublicKey(mint),
    ).then(async signatures => {
        return await Promise.all(
            signatures.map(async (tx, i) => {
                const isMagicEden = await identifyTx(tx.signature, solana)
                if (!isMagicEden) return false

                if (!isMagicEden.time.isAfter(cutoff)) return false

                if (
                    (!owner || isMagicEden.seller === owner)
                ) return isMagicEden
            })
        )
    })

    return listings.find(listing => listing) || null
}

const isFullGrown = async (mint) => {
    let mintPubkey = new PublicKey(mint);
    let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
    const tokenmeta = await Metadata.load(solana, tokenmetaPubkey)
    const metadata = await (await fetch(tokenmeta.data.data.uri, {timeout: 30000})).json()
    const growth = metadata.attributes.find(attribute => attribute.trait_type === 'Maturity').value

    return {mint, grown: growth === 'Grown Lvl-1'};
}


program.command('lastListing')
    .option('-m, --mintAddress <mintAddress>', 'Mint to analyze')
    .action(async (options) => {
        console.log(`Last listing for ${options.mintAddress}: ` + await latestListing(options.mintAddress));
    })

program.command('grown')
    .option('-m, --mintAddress <mintAddress>', 'Mint to analyze')
    .action(async (options) => {
        console.log(`Pothead ${options.mintAddress}: ` + await isFullGrown(options.mintAddress));
    })




program.command('parse')
    .option('-f, --file <file>', 'file to parse')
    .option('-l, --listedAfter <listedAfter>', 'calculated listed pots')
    .action(async (options) => {
        const snapshot = JSON.parse(fs.readFileSync(path.resolve(options.file)).toString());

        const sorted = Object.values(
            snapshot.reduce((acc, cur) => {
                if (!acc[cur.owner_wallet]) {
                    acc[cur.owner_wallet] = {
                        wallet: cur.owner_wallet === wallets.m1 ? 'Magic Eden' : cur.owner_wallet,
                        ata: cur.associated_token_address,
                        held: [],
                        listed: [],
                        grown: [],
                    }
                }

                acc[cur.owner_wallet].held.push(cur.mint_account)

                return acc
            }, {})
        ).sort((a, b) => {
            return  b.held.length - a.held.length
        })

        const listings = await Promise.all(
            snapshot.map(async mint => {
                return latestListing(mint.mint_account, null, options.listedAfter)
            })
        );

        const fullGrown = await Promise.all(
            snapshot.map(async mint => {
                return isFullGrown(mint.mint_account)
            })
        );

        const sortedWithListingsAndGrowth = await Promise.all(sorted.map(async holder => {
            holder.listed = listings.filter(listing => listing && listing.seller === holder.wallet && listing.type === 'ME Listing')
            holder.grown = fullGrown.filter(pot => pot.grown && holder.held.includes(pot.mint))
            return holder
        }))



        fs.writeFileSync(path.resolve(`${options.file}-formatted.json`), JSON.stringify(sortedWithListingsAndGrowth, null, 2));

        const output = sortedWithListingsAndGrowth.map(holder => {
            return `${n(holder.held.length, 'green')} Held | ${n(holder.listed.length, 'red')} Listed | ${n(holder.grown.length, 'yellow')} Grown | ${holder.wallet}  ${chalk.yellow('||')} `
        })

        console.log(output.join('\n'))
    });

program.parse(process.argv);
