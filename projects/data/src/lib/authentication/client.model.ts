export interface ClientModel {
    id: string;
    codeChallenge: string | null;
    authorizationCode: string | null;
    codeGeneratedAt: Date | null;
}
