import { nanoid } from 'nanoid';

export class ClientModel {
    id: string;
    codeChallenge: string | null;
    authorizationCode: string | null;
    codeGeneratedAt: Date | null;

    constructor() {
        this.id = nanoid(32);
    }
}
