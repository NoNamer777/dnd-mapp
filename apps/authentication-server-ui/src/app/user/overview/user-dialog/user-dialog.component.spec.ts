import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ButtonHarness,
    createTestEnvironment,
    provideDnDMappTesting,
    runInitializers,
    UserDialogHarness,
} from '@dnd-mapp/authentication-server-ui/testing';
import { ButtonComponent, provideTranslations } from '../../../shared';
import { UsersOverviewStore } from '../../services/users-overview.store';
import { UsersService } from '../../services/users.service';

describe('UserDialogComponent', () => {
    @Component({
        template: '<button dma-button (click)="onOpenDialog()">Open Dialog</button>',
        imports: [ButtonComponent],
    })
    class TestComponent {
        private readonly destroyRef = inject(DestroyRef);
        private readonly userOverviewStore = inject(UsersOverviewStore);

        protected onOpenDialog() {
            this.userOverviewStore.create().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
    }

    async function setupTest() {
        const { harnessLoader } = await createTestEnvironment({
            testComponent: TestComponent,
            providers: [UsersOverviewStore, UsersService, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        const buttonHarness = await harnessLoader.getHarness(ButtonHarness);

        return {
            harnessLoader: harnessLoader,
            buttonHarness: buttonHarness,
        };
    }

    it('should render', async () => {
        const { harnessLoader, buttonHarness } = await setupTest();

        await buttonHarness.click();

        const harness = await harnessLoader.getHarness(UserDialogHarness);
        expect(harness).toBeDefined();
    });
});
