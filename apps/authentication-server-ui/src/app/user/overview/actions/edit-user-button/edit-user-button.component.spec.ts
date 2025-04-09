import { Component, inject } from '@angular/core';
import {
    EditUserButtonHarness,
    createTestEnvironment,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { defaultUsers } from '@dnd-mapp/data';
import { provideTranslations } from '../../../../shared';
import { UsersOverviewStore } from '../../../services/users-overview.store';
import { EditUserButtonComponent } from './edit-user-button.component';

describe('EditUserButtonComponent', () => {
    @Component({
        template: `<dma-edit-user-button (editUser)="onEditUser()" />`,
        imports: [EditUserButtonComponent],
    })
    class TestComponent {
        private readonly usersOverviewStore = inject(UsersOverviewStore);

        protected onEditUser() {
            this.usersOverviewStore.selectedUser.set(defaultUsers[0]);
        }
    }

    async function setupTest() {
        const { harness } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: EditUserButtonHarness,
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
        };
    }

    it('should render', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });

    // it('should edit a user', async () => {});
});
