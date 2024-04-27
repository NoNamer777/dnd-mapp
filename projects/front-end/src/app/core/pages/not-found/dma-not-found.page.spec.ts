import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaNotFoundHarness } from '@dnd-mapp/front-end/testing';
import { DmaNotFoundPage } from './dma-not-found.page';

describe('DmaNotFoundPage', () => {
    @Component({
        template: `<dma-not-found />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [DmaNotFoundPage],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaNotFoundHarness),
        };
    }

    it('should initialize', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
