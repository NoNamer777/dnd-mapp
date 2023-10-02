export enum Coinages {
    cp = 0.01, // Copper pieces
    sp = 0.1, // Silver pieces
    ep = 0.5, // Electrum pieces
    gp = 1, // Gold pieces
    pp = 10, // Platinum pieces
}

export type CoinageType = 'cp' | 'sp' | 'ep' | 'gp' | 'pp';

export class Coinage {
    /** The rates to exchange this particular coinage into Gold pieces */
    exchangeRate: number;
    type: CoinageType;

    constructor(type: CoinageType) {
        this.type = type;
        this.exchangeRate = Coinages[type];
    }
}
