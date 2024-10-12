export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    roles: Role[];
}

const Roles = {
    PLAYER: 'Player',
    DUNGEON_MASTER: 'Dungeon Master',
    ADMIN: 'Administrator',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
