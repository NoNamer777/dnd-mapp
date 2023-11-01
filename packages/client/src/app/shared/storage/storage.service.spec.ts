import { TestBed } from '@angular/core/testing';
import { withInMemoryStorage } from './constants';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    function setupTestEnvironment(params?: { initialValue: { [key: string]: string } }) {
        TestBed.configureTestingModule({
            providers: [StorageService, withInMemoryStorage(params?.initialValue)],
        });

        return {
            service: TestBed.inject(StorageService),
        };
    }

    it('should get a stored item by key', () => {
        const { service } = setupTestEnvironment({ initialValue: { key1: 'value1' } });

        expect(service.getItem('key1')).toEqual('value1');
    });

    it('should store an item by key', () => {
        const { service } = setupTestEnvironment();

        expect(service.getItem('key')).toBeNull();

        service.setItem('key', 'value');
        expect(service.getItem('key')).toEqual('value');
    });

    it('should update a stored item by key', () => {
        const { service } = setupTestEnvironment({ initialValue: { key1: 'value1' } });

        service.setItem('key1', 'value11');
        expect(service.getItem('key1')).toEqual('value11');
    });

    it('should remove a stored item by key', () => {
        const { service } = setupTestEnvironment({ initialValue: { key1: 'value1' } });

        expect(service.getItem('key1')).toEqual('value1');
        service.removeItem('key1');
        expect(service.getItem('key1')).toBeNull();
    });

    it('should clear all stored items', () => {
        const { service } = setupTestEnvironment({ initialValue: { key1: 'value1', key2: '2' } });

        expect(service.getItem('key1')).toEqual('value1');
        expect(service.getItem('key2')).toEqual('2');

        service.clear();
        expect(service.getItem('key1')).toBeNull();
        expect(service.getItem('key2')).toBeNull();
    });
});
