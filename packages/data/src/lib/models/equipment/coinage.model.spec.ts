import { Coinage, CoinageType } from './coinage.model';

describe('Coinage', () => {
    test('should exchange from gold to other Coinages', () => {
        expect(Coinage.exchange('1 gp', CoinageType.COPPER)).toEqual('100 cp');
        expect(Coinage.exchange('1 gp', CoinageType.SILVER)).toEqual('10 sp');
        expect(Coinage.exchange('1 gp', CoinageType.ELECTRUM)).toEqual('2 ep');
    });

    test('should throw error when exchanging coinage which results in decimal numbers', () => {
        expect(() => Coinage.exchange('1 gp', CoinageType.PLATINUM)).toThrowError(
            `Can't exchange 1 of gold pieces to platinum pieces. Will result in rest values.`
        );
    });

    test('should exchange from Coinage to other Coinages', () => {
        // Copper to any
        expect(Coinage.exchange('10 cp', CoinageType.SILVER)).toEqual('1 sp');
        expect(Coinage.exchange('50 cp', CoinageType.ELECTRUM)).toEqual('1 ep');
        expect(Coinage.exchange('100 cp', CoinageType.GOLD)).toEqual('1 gp');
        expect(Coinage.exchange('1000 cp', CoinageType.PLATINUM)).toEqual('1 pp');

        // Silver to any
        expect(Coinage.exchange('1 sp', CoinageType.COPPER)).toEqual('10 cp');
        expect(Coinage.exchange('5 sp', CoinageType.ELECTRUM)).toEqual('1 ep');
        expect(Coinage.exchange('10 sp', CoinageType.GOLD)).toEqual('1 gp');
        expect(Coinage.exchange('100 sp', CoinageType.PLATINUM)).toEqual('1 pp');

        // Electrum to any
        expect(Coinage.exchange('1 ep', CoinageType.COPPER)).toEqual('50 cp');
        expect(Coinage.exchange('1 ep', CoinageType.SILVER)).toEqual('5 sp');
        expect(Coinage.exchange('2 ep', CoinageType.GOLD)).toEqual('1 sp');
        expect(Coinage.exchange('20 ep', CoinageType.PLATINUM)).toEqual('1 pp');

        // Platinum to any
        expect(Coinage.exchange('1 pp', CoinageType.COPPER)).toEqual('1000 cp');
        expect(Coinage.exchange('1 pp', CoinageType.SILVER)).toEqual('100 sp');
        expect(Coinage.exchange('1 pp', CoinageType.ELECTRUM)).toEqual('20 ep');
        expect(Coinage.exchange('1 pp', CoinageType.GOLD)).toEqual('10 gp');
    });
});
