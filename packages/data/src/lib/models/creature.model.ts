import { AbilityScore } from './ability-score.model';

import { Abilities, AbilityName } from './ability.model';
import { Level } from './level.model';
import { SkillName } from './skill.model';

export class CreatureModel {
    speed: number;
    level: Level;

    abilityScores: Set<AbilityScore>;

    get armorClass() {
        // TODO: When a creature wears armor, use that in the calculation
        return 10 + this.retrieveAbilityScoreFromAbility(Abilities.DEXTERITY)!.modifier;
    }

    abilitySave(abilityName: AbilityName) {
        // TODO: Check if creature is proficient with the Ability save and calculate the result.
        return this.retrieveAbilityScoreFromAbility(abilityName)!.score;
    }

    skillScore(skillName: SkillName) {
        // TODO: Check if the creature is proficient with the Skill and calculate the result.
        return this.retrieveAbilityScoreFromSkill(skillName)!.score;
    }

    hasAbilityScoreForAbility(abilityName: AbilityName) {
        return Boolean(
            [...this.abilityScores].find((abilityScore: AbilityScore) => abilityScore.ability.name === abilityName)
        );
    }

    private retrieveAbilityScoreFromAbility(abilityName: AbilityName) {
        return [...this.abilityScores].find((abilityScore: AbilityScore) => abilityScore.ability.name === abilityName);
    }

    private retrieveAbilityScoreFromSkill(skillName: SkillName) {
        return [...this.abilityScores].find((abilityScore: AbilityScore) =>
            abilityScore.ability.skills.find((skill) => skill.name === skillName)
        );
    }
}
