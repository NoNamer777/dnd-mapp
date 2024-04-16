export interface Config {
    baseBackEndURL: string;
}

export const defaultConfig: Config = {
    baseBackEndURL: 'http://localhost:8080/server',
};
