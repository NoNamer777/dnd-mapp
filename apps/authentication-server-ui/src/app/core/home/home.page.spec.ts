import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HomeHarness, provideDnDMappTesting, runInitializers } from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../shared';
import { HomePage } from './home.page';

describe('HomeComponent', () => {
    @Component({
        template: `<dma-home />`,
        imports: [HomePage],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideDnDMappTesting(), provideTranslations()],
        });

        await runInitializers();

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(HomeHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
