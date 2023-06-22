export interface Ability {
    id: number;
    name: string;
}

export type CreateAbilityData = Omit<Ability, 'id'>;
