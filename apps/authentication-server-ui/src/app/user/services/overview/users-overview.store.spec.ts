import { TestBed } from '@angular/core/testing';

import {
    createTestEnvironment,
    defaultUsers,
    mockUserDB,
    provideDnDMappTesting,
} from '@dnd-mapp/authentication-server-ui/testing';
import { lastValueFrom } from 'rxjs';
import { UsersOverviewStore } from './users-overview-store';

describe('UsersOverviewStore', () => {
    async function setupTest() {
        await createTestEnvironment({
            providers: [UsersOverviewStore, provideDnDMappTesting()],
        });

        const logSpy = spyOn(console, 'log');

        return {
            store: TestBed.inject(UsersOverviewStore),
            logSpy: logSpy,
        };
    }

    it('should lock actions', async () => {
        const { store } = await setupTest();

        expect(store.lockActions()).toBeFalse();

        store.selectedUser.set(defaultUsers[0]);
        expect(store.lockActions()).toBeFalse();

        store.processing.set(true);
        expect(store.lockActions()).toBeTrue();

        store.selectedUser.set(null);
        expect(store.lockActions()).toBeFalse();
    });

    it('should edit a User', async () => {
        const { store, logSpy } = await setupTest();

        store.selectedUser.set(defaultUsers[0]);

        expect(logSpy).not.toHaveBeenCalled();

        store.edit();

        expect(logSpy).toHaveBeenCalledWith(`Editing User with ID "${defaultUsers[0].id}"`);
    });

    it('should delete a User', async () => {
        const { store } = await setupTest();

        store.selectedUser.set(defaultUsers[0]);

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await lastValueFrom(store.delete());

        expect(mockUserDB.getById(defaultUsers[0].id)).toBeNull();
    });
});
