export interface User {
    id: number;
    username: string;
    password: string;
    emailAddress: string;
}

export type CreateUserData = Omit<User, 'id'>;
