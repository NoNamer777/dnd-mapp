import { InjectionToken } from '@angular/core';

export enum StorageKey {
    CLIENT_ID = 'clientId',
    ACCESS_TOKEN = 'accessToken',
}

export const STORAGE = new InjectionToken('storage location', {
    providedIn: 'root',
    factory: () => sessionStorage,
});

export const inMemoryStorageProvider = (initialValues?: { [key: string]: string }) => ({
    provide: STORAGE,
    useFactory: () => new InMemoryStorage(initialValues),
});

export class InMemoryStorage {
    private storage: { [key: string]: string } = {};

    constructor(initialValue?: { [key: string]: string }) {
        if (!initialValue) return;

        this.storage = initialValue;
    }

    clear(): void {
        this.storage = {};
    }

    getItem(key: string): string | null {
        return this.storage[key];
    }

    removeItem(key: string): void {
        delete this.storage[key];
    }

    setItem(key: string, value: string): void {
        this.storage[key] = value;
    }
}
