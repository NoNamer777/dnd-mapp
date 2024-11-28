import { Component, inject } from '@angular/core';
import {
    UserActionsHarness,
    createTestEnvironment,
    defaultUsers,
    mockUserDB,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../../shared';
import { UsersOverviewStore } from '../../services/overview/users-overview-store';
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
        const { harness } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: UserActionsHarness,
            imports: [UserActionsComponent],
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
        };
    }

    it('should edit User', async () => {
        const { harness } = await setupTest();
        const logSpy = spyOn(console, 'log');

        await harness.edit();
        expect(logSpy).toHaveBeenCalledWith('Editing User with ID "mUaZQqsMMrOkP-wlbAiUR"');
    });

    it('should delete User', async () => {
        const { harness } = await setupTest();

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await harness.delete();

        expect(mockUserDB.getById(defaultUsers[0].id)).toBeNull();
    });
});
