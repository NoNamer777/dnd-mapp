import { Ability } from './ability.model';

export class AbilityScore {
    ability: Ability;
    score: number;

    get modifier() {
        return Math.floor((this.score - 10) / 2);
    }

    decrease(points: number) {
        if (this.score === 0) return;

        if (this.score - points <= 0) {
            this.score = 0;
        } else {
            this.score -= points;
        }
    }

    increase(points: number) {
        this.score += points;
    }
}
