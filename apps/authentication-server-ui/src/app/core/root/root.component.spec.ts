import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideDnDMappTesting, RootHarness, runInitializers } from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../shared';
import { appRoutes } from '../config';
import { RootComponent } from './root.component';

describe.only('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [RootComponent],
            declarations: [TestComponent],
            providers: [provideRouter(appRoutes), provideDnDMappTesting(), provideTranslations()],
        });

        await runInitializers();

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(RootHarness),
        };
    }

    it('should render the component', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
