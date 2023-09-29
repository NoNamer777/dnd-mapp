import { AbilityScore } from './ability-score.model';

import { Abilities } from './ability.model';
import { Level } from './level.model';
import { Skill } from './skill.model';

export class CreatureModel {
    speed: number;
    level: Level;

    abilityScores: Set<AbilityScore>;

    get armorClass() {
        // TODO: When a creature wears armor, use that in the calculation
        return 10 + this.retrieveAbilityScoreFromAbility(Abilities.DEXTERITY)!.modifier;
    }

    abilitySave(abilityName: string) {
        // TODO: Check if creature is proficient with the Ability save and calculate the result.
        return this.retrieveAbilityScoreFromAbility(abilityName)!.score;
    }

    skillScore(skillName: string) {
        // TODO: Check if the creature is proficient with the Skill and calculate the result.
        return this.retrieveAbilityScoreFromSkill(skillName)!.score;
    }

    private retrieveAbilityScoreFromAbility(abilityName: string) {
        for (const abilityScore of this.abilityScores.values()) {
            if (abilityScore.ability.name !== abilityName) continue;

            return abilityScore;
        }
        return null;
    }

    private retrieveAbilityScoreFromSkill(skillName: string) {
        let skills: Skill[] = [];

        for (const abilityScore of this.abilityScores.values()) {
            skills = [...skills, ...abilityScore.ability.skills];
        }
        const skill = skills.find((skill) => skill.name === skillName)!;

        return this.retrieveAbilityScoreFromAbility(skill.ability.name);
    }
}
