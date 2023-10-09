import { Coinage, CoinageTypes } from './coinage.model';

describe('Coinage', () => {
    test('should exchange from gold to other Coinages', () => {
        expect(Coinage.exchange('1 gp', CoinageTypes.copper)).toEqual('100 cp');
        expect(Coinage.exchange('1 gp', CoinageTypes.silver)).toEqual('10 sp');
        expect(Coinage.exchange('1 gp', CoinageTypes.electrum)).toEqual('2 ep');
    });

    test('should throw error when exchanging coinage which results in decimal numbers', () => {
        expect(() => Coinage.exchange('1 gp', CoinageTypes.platinum)).toThrowError(
            `Can't exchange 1 of gold pieces to platinum pieces. Will result in rest values.`
        );
    });

    test('should exchange from non-gold Coinage to other Coinages', () => {
        // Copper to any
        expect(Coinage.exchange('10 cp', CoinageTypes.silver)).toEqual('1 sp');
        expect(Coinage.exchange('50 cp', CoinageTypes.electrum)).toEqual('1 ep');
        expect(Coinage.exchange('1000 cp', CoinageTypes.platinum)).toEqual('1 pp');

        // Silver to any
        expect(Coinage.exchange('1 sp', CoinageTypes.copper)).toEqual('10 cp');
        expect(Coinage.exchange('5 sp', CoinageTypes.electrum)).toEqual('1 ep');
        expect(Coinage.exchange('100 sp', CoinageTypes.platinum)).toEqual('1 pp');

        // Electrum to any
        expect(Coinage.exchange('1 ep', CoinageTypes.copper)).toEqual('50 cp');
        expect(Coinage.exchange('1 ep', CoinageTypes.silver)).toEqual('5 sp');
        expect(Coinage.exchange('20 ep', CoinageTypes.platinum)).toEqual('1 pp');

        // Platinum to any
        expect(Coinage.exchange('1 pp', CoinageTypes.copper)).toEqual('1000 cp');
        expect(Coinage.exchange('1 pp', CoinageTypes.silver)).toEqual('100 sp');
        expect(Coinage.exchange('1 pp', CoinageTypes.electrum)).toEqual('20 ep');
    });
});
