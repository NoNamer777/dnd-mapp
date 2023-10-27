export class User {
    id: number;
    username: string;
    password: string;
    emailAddress: string;

    constructor(username: string, password: string, emailAddress: string, id?: number) {
        if (id) {
            this.id = id;
        }
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
    }
}

export type CreateUserData = Omit<User, 'id'>;
