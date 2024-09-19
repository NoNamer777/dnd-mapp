import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundHarness } from '@dnd-mapp/authentication-server-ui/testing';
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
            providers: [provideExperimentalZonelessChangeDetection(), provideRouter([])],
        });

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
