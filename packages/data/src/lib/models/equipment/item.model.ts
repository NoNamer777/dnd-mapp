import { BaseEntityModel } from '../entity.model';
import { Coinage, CoinageType } from './coinage.model';

export class Item implements BaseEntityModel {
    id: number;
    name: string;
    quantity: number;

    /** The monetary value of the item stored in the following format: `1.0 cp`. */
    cost: string;
    weight: number;

    get monetaryValue() {
        const costValue = this.cost.split(' ');

        return {
            quantity: Number(costValue[0]),
            coinage: new Coinage(costValue[1] as CoinageType),
        };
    }
}
