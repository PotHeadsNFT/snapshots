import identifyTx from '../MagicEdenTransactionIdentifier.mjs';

const transactions = [
    {
        me1Sale: {
            txid: '2tAo6SPDV8E6Mwm4scsrVT1gPHsJ9Urfpzo8PuP6wvyXpfXJdv81kHpJsKypLBVU3Sos2bbofLAnY7XNB57qwyqK',
            type: 'ME Sale',
            buyer: '34VQmFxGJU2ZFw2YExzpjFt7mut7sUvDWVdzmaaQMG9b',
            seller: '6xDDrdFQhFUZoDg2J95VUZ9NpBpg1F38LCXASrY3pNtr',
            price: 0.39
        },
        me1Listing: {
            txid: 'ZVKXDaC7MFwgNFFChPhCV1u9RAyHW8ad4Q5Tcv384sJbg2kZN9nmP6epABcqGpxeV9g9qgKY3HtDakZYcZFwEah',
            type: 'ME Listing',
            seller: '6xDDrdFQhFUZoDg2J95VUZ9NpBpg1F38LCXASrY3pNtr',
        },
        me2Sale:  {
            txid: '2ciNZMzpqPikdg1twUCk7mjpxpVxTT8B5osEFzCzCEUEw2RP1gzepV7g3ku54HbwJFYw18tkirypwVcDNNHhXdPG',
            type: 'ME Sale',
            seller: 'BUyG741vA3KGcLTStrUUhFUKKZNeF1cBgw1QmhJrXSUF',
            buyer: 'ENdU6xCQNdX4Ac3zhFpZ729KtUzZ2AzunjYD3JyGWjeQ',
            price: 0.68
        },
        me2Listing: {
            txid: '2whzuME892xcrTeEKv1bQShkgQGGNjYeaiNTpZvJTqPiHP9C9N1J8acnX1HcZFYijnmr9rx3ymjAHLwGvQoB8R9U',
            type: 'ME Listing',
            seller: 'BUyG741vA3KGcLTStrUUhFUKKZNeF1cBgw1QmhJrXSUF',
        },
    },
    {
        me1Sale: {
            txid: '59a5PwFKAfEn2Ch3ttdCGgcgDpkCEmkgWG7KeFo5fyrkp9s7u3h1e5Xcm1Cwkr3Vca3yMggs25JCqWx8GLStZ6QG',
            type: 'ME Sale',
            buyer: '31hm9URvL6MkiiCN2MzmH9VvvVUsZq8cbmekAEJWttPE',
            seller: 'BiGKo5kGRvNSWV66rVwCtGF5BfKGrMULXvxMG9PFAv6h',
            price: 0.40
        },
        me1Listing: {
            txid: '3bk99K4AUfEVrCUUkSCyV4cKJzQcyojzTcpdk3o2wd7Ma63Djfqdkw8MzoBPet1Apy2BV34xJ3FfgDcjKM8tBpZB',
            type: 'ME Listing',
            seller: 'BiGKo5kGRvNSWV66rVwCtGF5BfKGrMULXvxMG9PFAv6h',
        },
        me2Sale:  {
            txid: 'HSV69x156BoPYacKs5VJtSKmmAWXWYwket6rcwdXtmaZc8jbci13b8XBjqgrb7taKQKrVi9KL3uve2XMwUK5D6W',
            type: 'ME Sale',
            seller: '31hm9URvL6MkiiCN2MzmH9VvvVUsZq8cbmekAEJWttPE',
            buyer: '6VpbnmYk7vGGoQn4TyG6Ki6y9xJUz8iDFxeSUAkqMZnN',
            price: 1.00
        },
        me2Listing: {
            txid: '5352DeEG2ssdiGhEpbV3Xf7eooNSrLuG2CfDGJrE3bqaPym96grKgYV7ikA4wb7R7MMp8NtVqyZKdV3ek4YNRYc7',
            type: 'ME Listing',
            seller: '31hm9URvL6MkiiCN2MzmH9VvvVUsZq8cbmekAEJWttPE',
        },
    }
];

describe("A suite", function() {
    transactions.forEach(async function(transaction) {
        await it('it correctly identifies ME V1 Sales', async function() {
            const sale = await identifyTx(transaction.me1Sale.txid);

            expect(sale.type).toBe('ME Sale');
            expect(sale.seller).toBe(transaction.me1Sale.seller);
            expect(sale.buyer).toBe(transaction.me1Sale.buyer);
            expect(sale.price.toFixed(2)).toBe(transaction.me1Sale.price.toFixed(2));
        })
    });

    transactions.forEach(async function(transaction) {
        it('it correctly identifies ME V2 Sales', async function() {
            const sale = await identifyTx(transaction.me2Sale.txid);

            expect(sale.type).toBe('ME Sale');
            expect(sale.seller).toBe(transaction.me2Sale.seller);
            expect(sale.buyer).toBe(transaction.me2Sale.buyer);
            expect(sale.price.toFixed(2)).toBe(transaction.me2Sale.price.toFixed(2));
        });
    })

    // transactions.forEach(async function(transaction) {
    //     it('it correctly identifies ME V1 Listings', async function() {
    //         const list = await identifyTx(transaction.me1Listing.txid);

    //         expect(list.type).toBe('ME Listing');
    //         expect(list.seller).toBe(transaction.me1Listing.seller);
    //     });
    // })

    // transactions.forEach(async function(transaction) {
    //     it('it correctly identifies ME V2 Listings', async function() {
    //         const list = await identifyTx(transaction.me2Listing.txid);
    //         expect(await list.type).toBe('ME Listing');
    //         expect(await list.seller).toBe(transaction.me2Listing.seller);
    //     });
    // })
});
