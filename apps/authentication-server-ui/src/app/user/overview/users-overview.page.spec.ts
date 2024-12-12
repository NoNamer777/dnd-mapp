import { Component } from '@angular/core';
import {
    createTestEnvironment,
    getMsw,
    provideDnDMappTesting,
    runInitializers,
    UsersOverviewHarness,
} from '@dnd-mapp/authentication-server-ui/testing';
import { defaultUsers } from '@dnd-mapp/data';
import { http, HttpResponse } from 'msw';
import { provideTranslations } from '../../shared';
import { UsersOverviewStore } from '../services/users-overview-store';
import { UsersOverviewPage } from './users-overview.page';

describe('UsersOverviewPage', () => {
    @Component({
        template: `<dma-users-overview />`,
    })
    class TestComponent {}

    async function setupTest() {
        const { harness, fixture } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: UsersOverviewHarness,
            imports: [UsersOverviewPage],
            providers: [UsersOverviewStore, provideDnDMappTesting(), provideTranslations()],
            initFunction: async () => await runInitializers(),
        });

        return {
            harness: harness,
            fixture: fixture,
        };
    }

    it('should show Users', async () => {
        const { harness } = await setupTest();

        const tableHarness = await harness.getUsersTableHarness();

        expect(await tableHarness.isTableEmptyMessageVisible()).toEqual(false);
        expect(await tableHarness.getNumberOfRows()).toEqual(defaultUsers.length);
    });

    it('should show no Users message', async () => {
        getMsw().use(http.get('https://localhost.dndmapp.net:8080/authentication/users', () => HttpResponse.json([])));
        const { harness } = await setupTest();

        const tableHarness = await harness.getUsersTableHarness();

        expect(await tableHarness.getNumberOfRows()).toEqual(1);
        expect(await tableHarness.isTableEmptyMessageVisible()).toEqual(true);
        expect(await tableHarness.getTableEmptyMessage()).toEqual('No Users were found');
    });
});
