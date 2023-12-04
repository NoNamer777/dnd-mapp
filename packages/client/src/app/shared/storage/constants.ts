import { InjectionToken } from '@angular/core';

export const TOKEN_STORAGE_KEY = 'token';

export const CLIENT_ID_STORAGE_KEY = 'client_id';

export const STORAGE = new InjectionToken('storage location', {
    providedIn: 'root',
    factory: () => localStorage,
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
