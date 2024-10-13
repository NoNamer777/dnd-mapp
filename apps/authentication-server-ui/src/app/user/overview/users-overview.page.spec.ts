import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    getMsw,
    provideDnDMappTesting,
    runInitializers,
    UsersOverviewHarness,
} from '@dnd-mapp/authentication-server-ui/testing';
import { http, HttpResponse } from 'msw';
import { provideTranslations } from '../../shared';
import { UsersOverviewPage } from './users-overview.page';

describe('UsersOverviewPage', () => {
    @Component({
        template: `<dma-users-overview />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [UsersOverviewPage],
            declarations: [TestComponent],
            providers: [provideDnDMappTesting(), provideTranslations()],
        });

        await runInitializers();

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(UsersOverviewHarness),
            fixture,
        };
    }

    it('should show Users', async () => {
        const { harness } = await setupTest();

        const tableHarness = await harness.getUsersTableHarness();

        expect(await tableHarness.isTableEmptyMessageVisible()).toEqual(false);
        expect(await tableHarness.getNumberOfRows()).toEqual(3);
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
