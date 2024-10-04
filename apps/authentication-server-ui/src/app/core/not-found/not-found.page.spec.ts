import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundHarness, provideDnDMappTesting, runInitializers } from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../../shared';
import { NotFoundPage } from './not-found.page';

describe('NotFoundComponent', () => {
    @Component({
        template: `<dma-not-found />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [NotFoundPage],
            declarations: [TestComponent],
            providers: [provideRouter([]), provideDnDMappTesting(), provideTranslations()],
        });

        await runInitializers();

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(NotFoundHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
