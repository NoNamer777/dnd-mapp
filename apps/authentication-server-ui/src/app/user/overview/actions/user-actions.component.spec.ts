import { Component, inject } from '@angular/core';
import {
    DeleteUserDialogHarness,
    UserActionsHarness,
    createTestEnvironment,
    defaultUsers,
    mockUserDB,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../../shared';
import { UsersOverviewStore } from '../../services/users-overview-store';
import { UserActionsComponent } from './user-actions.component';

describe('UserActionsComponent', () => {
    @Component({
        template: ` <dma-user-actions [user]="user" (selectUser)="onSelectUser()" />`,
    })
    class TestComponent {
        private readonly usersOverviewStore = inject(UsersOverviewStore);

        protected readonly user = defaultUsers[0];

        protected onSelectUser() {
            this.usersOverviewStore.selectedUser.set(this.user);
        }
    }

    async function setupTest() {
        const { harness, harnessLoader } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: UserActionsHarness,
            imports: [UserActionsComponent],
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
            harnessLoader: harnessLoader,
        };
    }

    it('should edit User', async () => {
        const { harness } = await setupTest();
        const logSpy = spyOn(console, 'log');

        await harness.edit();
        expect(logSpy).toHaveBeenCalledWith('Editing User with ID "mUaZQqsMMrOkP-wlbAiUR"');
    });

    it('should delete User', async () => {
        const { harness, harnessLoader } = await setupTest();

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await harness.delete();

        const deleteUserDialogHarness = await harnessLoader.getHarness(DeleteUserDialogHarness);

        expect(deleteUserDialogHarness).not.toBeNull();
        expect(await deleteUserDialogHarness.getDialogTitle()).toEqual(`Delete ${defaultUsers[0].username}?`);
        expect(await deleteUserDialogHarness.getDialogContent()).toEqual(`This can't be undone`);

        await deleteUserDialogHarness.delete();
        expect(mockUserDB.getById(defaultUsers[0].id)).toBeNull();
    });

    it('should not delete User', async () => {
        const { harness, harnessLoader } = await setupTest();

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await harness.delete();

        const deleteUserDialogHarness = await harnessLoader.getHarness(DeleteUserDialogHarness);

        expect(deleteUserDialogHarness).not.toBeNull();

        await deleteUserDialogHarness.cancel();
        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();
    });
});
