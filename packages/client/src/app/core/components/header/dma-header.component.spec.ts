import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaHeaderHarness } from '../../../../testing';
import { DmaHeaderModule } from './dma-header.module';

describe('HeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHeaderModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaHeaderHarness),
        };
    }

    it('should show the components text content', async () => {
        const { harness } = await setupTestEnvironment();
        expect(await harness.getTextContent()).toEqual('Header component works!');
    });
});
