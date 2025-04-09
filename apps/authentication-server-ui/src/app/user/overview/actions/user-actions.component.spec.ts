import { Component, inject } from '@angular/core';
import {
    UserActionsHarness,
    createTestEnvironment,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { defaultUsers } from '@dnd-mapp/data';
import { provideTranslations } from '../../../shared';
import { UsersOverviewStore } from '../../services/users-overview.store';
import { UserActionsComponent } from './user-actions.component';

describe('UserActionsComponent', () => {
    @Component({
        template: `<dma-user-actions [user]="user" (selectUser)="onSelectUser()" />`,
        imports: [UserActionsComponent],
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
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
            harnessLoader: harnessLoader,
        };
    }

    it('should render', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });

    // it('should edit User', async () => {});

    // it('should delete User', async () => {});

    // it('should not delete User', async () => {});
});
