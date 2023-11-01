import { Inject, Injectable } from '@angular/core';
import { STORAGE } from './constants';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor(@Inject(STORAGE) private readonly storage: Storage) {}

    getItem(key: string) {
        return this.storage.getItem(key) || null;
    }

    setItem(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}
