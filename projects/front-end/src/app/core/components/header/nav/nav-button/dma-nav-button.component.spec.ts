import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaNavButtonHarness } from '@dnd-mapp/front-end/testing';
import { DmaIconComponent } from '@dnd-mapp/shared-components';
import { DmaNavButtonComponent } from './dma-nav-button.component';

describe('DmaNavButtonComponent', () => {
    @Component({
        template: `<dma-nav-button label="Button"><dma-icon icon="plus" /></dma-nav-button>`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [DmaNavButtonComponent, DmaIconComponent],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaNavButtonHarness),
        };
    }

    it('should initialize', async () => {
        const { harness } = await setupTest();

        expect(await (await harness.getIcon()).getIcon()).toEqual('plus');
        expect(await harness.getLabel()).toEqual('Button');
    });
});
