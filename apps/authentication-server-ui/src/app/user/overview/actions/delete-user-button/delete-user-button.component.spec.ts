import { manualChangeDetection } from '@angular/cdk/testing';
import { Component, inject } from '@angular/core';
import {
    DeleteUserButtonHarness,
    createTestEnvironment,
    defaultUsers,
    mockUserDB,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../../../shared';
import { UsersOverviewStore } from '../../../services/overview/users-overview-store';
import { DeleteUserButtonComponent } from './delete-user-button.component';

describe('DeleteUserButtonComponent', () => {
    @Component({
        template: `<dma-delete-user-button (deleteUser)="onDeleteUser()" />`,
    })
    class TestComponent {
        private readonly userOverViewStore = inject(UsersOverviewStore);

        protected onDeleteUser() {
            this.userOverViewStore.selectedUser.set(defaultUsers[0]);
        }
    }

    async function setupTest() {
        const { harness, fixture } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: DeleteUserButtonHarness,
            imports: [DeleteUserButtonComponent],
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
            fixture: fixture,
        };
    }

    it('should delete a user', async () => {
        const { harness, fixture } = await setupTest();

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await manualChangeDetection(async () => {
            await harness.click();
            fixture.detectChanges();

            expect(await harness.isProcessing()).toEqual(true);

            await fixture.whenStable();
        });

        expect(await harness.isProcessing()).toEqual(false);
        expect(mockUserDB.getById(defaultUsers[0].id)).toBeNull();
    });
});
