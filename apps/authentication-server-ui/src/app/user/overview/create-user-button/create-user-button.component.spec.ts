import { Component } from '@angular/core';
import {
    createTestEnvironment,
    CreateUserButtonHarness,
    provideDnDMappTesting,
    runInitializers,
} from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../../shared';
import { UsersOverviewStore } from '../../services/users-overview.store';
import { UsersService } from '../../services/users.service';
import { CreateUserButtonComponent } from './create-user-button.component';

describe('CreateUserButtonComponent', () => {
    @Component({
        template: `<dma-create-user-button />`,
        imports: [CreateUserButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: CreateUserButtonHarness,
            providers: [UsersOverviewStore, UsersService, provideDnDMappTesting(), provideTranslations()],
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
});
