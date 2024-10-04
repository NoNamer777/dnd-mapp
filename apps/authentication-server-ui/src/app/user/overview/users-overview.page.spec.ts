import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    provideDnDMappTesting,
    runInitializers,
    UsersOverviewHarness,
} from '@dnd-mapp/authentication-server-ui/testing';
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

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(UsersOverviewHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
