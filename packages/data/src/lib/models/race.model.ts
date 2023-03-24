export interface Race {
    id: number;
    name: string;
}

export type CreateRaceData = Omit<Race, 'id'>;
