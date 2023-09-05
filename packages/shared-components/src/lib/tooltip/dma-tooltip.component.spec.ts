import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaTooltipModule } from './dma-tooltip.module';
import { DmaTooltipHarness } from '../testing';
import { DmaTooltipPosition } from './dma-tooltip.directive';

describe('DmaTooltipComponent', () => {
    @Component({
        template: '<p dmaTooltip="My Tooltip" [dmaTooltipPosition]="position">Hover over me</p>',
    })
    class TestComponent {
        position: DmaTooltipPosition = 'above';
    }

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaTooltipModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            fixture: fixture,
            component: fixture.componentInstance,
            harness: await harnessLoader.getHarness(DmaTooltipHarness),
        };
    }

    it('should show and hide tooltip', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isTooltipVisible()).toBeFalse();

        await harness.hoverOverParentElement();
        expect(await harness.isTooltipVisible()).toBeTrue();
        expect(await harness.getTooltipText()).toEqual('My Tooltip');

        await harness.moveMouseAwayFromParentElement();
        expect(await harness.isTooltipVisible()).toBeFalse();
    });

    it('should reflect the position in the rendered component', async () => {
        const { fixture, component, harness } = await setupTestEnvironment();

        await harness.hoverOverParentElement();
        expect(await harness.getTooltipPosition()).toEqual('above');

        await harness.moveMouseAwayFromParentElement();

        component.position = 'below';
        fixture.detectChanges();

        await harness.hoverOverParentElement();
        expect(await harness.getTooltipPosition()).toEqual('below');

        await harness.moveMouseAwayFromParentElement();

        component.position = 'before';
        fixture.detectChanges();

        await harness.hoverOverParentElement();
        expect(await harness.getTooltipPosition()).toEqual('before');

        await harness.moveMouseAwayFromParentElement();

        component.position = 'after';
        fixture.detectChanges();

        await harness.hoverOverParentElement();
        expect(await harness.getTooltipPosition()).toEqual('after');
    });
});
