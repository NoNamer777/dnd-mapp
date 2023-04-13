import { TestBed } from '@angular/core/testing';
import { CenterModule } from './center.module';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CenterComponentHarness } from '../../../../testing';

describe('CenterComponent', () => {
    @Component({
        template: '<dma-center></dma-center>',
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [CenterModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(CenterComponentHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getTextContent()).toEqual('Center component works!');
    });
});
