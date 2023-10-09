export enum Coinages {
    cp = 0.01, // Copper pieces
    sp = 0.1, // Silver pieces
    ep = 0.5, // Electrum pieces
    gp = 1, // Gold pieces
    pp = 10, // Platinum pieces
}

export enum CoinageTypes {
    copper = 'cp',
    silver = 'sp',
    electrum = 'ep',
    gold = 'gp',
    platinum = 'pp',
}

function findCoinageTypeFromAbbreviation(abbreviation: string) {
    return Object.entries(CoinageTypes).find(([key, value]) => {
        if (value === abbreviation) return key;

        return;
    })![0];
}

export type CoinageType = keyof typeof Coinages;

export class Coinage {
    static exchange(monetaryValue: string, targetCoinageType: CoinageTypes): string {
        const startingMonetaryValue = monetaryValue.split(' ');
        const amount = Number(startingMonetaryValue[0]);

        const startingCoinage = new Coinage(startingMonetaryValue[1] as CoinageType);
        const targetCoinage = new Coinage(targetCoinageType);

        const newAmount = Number((amount * (startingCoinage.exchangeRate / targetCoinage.exchangeRate)).toPrecision(6));

        if (!Number.isInteger(newAmount)) {
            throw new Error(
                `Can't exchange ${amount} of ${findCoinageTypeFromAbbreviation(
                    startingCoinage.type
                )} pieces to ${findCoinageTypeFromAbbreviation(targetCoinage.type)} pieces. Will result in rest values.`
            );
        }
        return `${newAmount} ${targetCoinage.type}`;
    }

    /** The rates to exchange this particular coinage into Gold pieces */
    exchangeRate: number;
    type: CoinageType;

    constructor(type: CoinageType) {
        this.type = type;
        this.exchangeRate = Coinages[type];
    }
}
