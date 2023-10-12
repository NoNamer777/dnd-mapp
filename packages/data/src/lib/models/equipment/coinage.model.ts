export enum Coinages {
    cp = 0.01, // Copper pieces
    sp = 0.1, // Silver pieces
    ep = 0.5, // Electrum pieces
    gp = 1, // Gold pieces
    pp = 10, // Platinum pieces
}

export enum CoinageType {
    COPPER = 'cp',
    SILVER = 'sp',
    ELECTRUM = 'ep',
    GOLD = 'gp',
    PLATINUM = 'pp',
}

function findCoinageNameFromAbbreviation(abbreviation: string): CoinageName {
    const coinageName = Object.entries(CoinageType).find(([key, value]) => {
        if (value === abbreviation) return key;

        return;
    })![0];

    return `${coinageName[0]}${coinageName.slice(1).toLowerCase()}` as CoinageName;
}

export type CoinageName = Capitalize<Lowercase<keyof typeof CoinageType>>;

export class Coinage {
    static exchange(monetaryValue: string, targetCoinageType: CoinageType): string {
        const startingMonetaryValue = monetaryValue.split(' ');
        const amount = Number(startingMonetaryValue[0]);

        const startingCoinage = new Coinage(startingMonetaryValue[1] as CoinageType);
        const targetCoinage = new Coinage(targetCoinageType);

        const newAmount = Number((amount * (startingCoinage.exchangeRate / targetCoinage.exchangeRate)).toPrecision(6));

        if (!Number.isInteger(newAmount)) {
            throw new Error(
                `Can't exchange ${amount} of ${findCoinageNameFromAbbreviation(
                    startingCoinage.type
                )} pieces to ${findCoinageNameFromAbbreviation(targetCoinage.type)} pieces. Will result in rest values.`
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
