import { manualChangeDetection } from '@angular/cdk/testing';
import { Component, inject } from '@angular/core';
import {
    DeleteUserButtonHarness,
    DeleteUserDialogHarness,
    createTestEnvironment,
    mockUserDB,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { defaultUsers } from '@dnd-mapp/data';
import { provideTranslations } from '../../../../shared';
import { UsersOverviewStore } from '../../../services/users-overview-store';
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
        const { harness, fixture, harnessLoader } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: DeleteUserButtonHarness,
            imports: [DeleteUserButtonComponent],
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
            fixture: fixture,
            harnessLoader: harnessLoader,
        };
    }

    it('should delete a user', async () => {
        const { harness, fixture, harnessLoader } = await setupTest();

        expect(mockUserDB.getById(defaultUsers[0].id)).not.toBeNull();

        await manualChangeDetection(async () => {
            await harness.click();
            fixture.detectChanges();

            expect(await harness.isProcessing()).toEqual(true);
            await fixture.whenStable();
        });

        const deleteUserDialogHarness = await harnessLoader.getHarness(DeleteUserDialogHarness);
        await deleteUserDialogHarness.delete();

        expect(await harness.isProcessing()).toEqual(false);
        expect(mockUserDB.getById(defaultUsers[0].id)).toBeNull();
    });

    it('should remove the tooltip when deleting a User if the tooltip is showing', async () => {
        const { harness, harnessLoader } = await setupTest();

        expect(await harness.isTooltipVisible()).toEqual(false);

        await harness.hoverOverAnchor();

        expect(await harness.isTooltipVisible()).toEqual(true);

        await harness.click();

        const deleteUserDialogHarness = await harnessLoader.getHarness(DeleteUserDialogHarness);
        await deleteUserDialogHarness.delete();

        expect(await harness.isTooltipVisible()).toEqual(false);
    });
});
