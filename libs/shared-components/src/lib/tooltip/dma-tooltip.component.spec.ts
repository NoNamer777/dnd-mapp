import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaTooltipHostHarness } from '../testing';
import { DmaTooltipPosition } from './dma-tooltip.directive';
import { DmaTooltipModule } from './dma-tooltip.module';

describe('DmaTooltipComponent', () => {
    @Component({
        template: '<p dmaTooltip="My Tooltip" [dmaTooltipPosition]="position" [disabled]="disabled">Hover over me</p>',
    })
    class TestComponent {
        position: DmaTooltipPosition = 'above';

        disabled = false;
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
            harness: await harnessLoader.getHarness(DmaTooltipHostHarness),
        };
    }

    it('should show and hide tooltip', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isTooltipVisible()).toBeFalse();

        await harness.hover();
        expect(await harness.isTooltipVisible()).toBeTrue();
        expect(await harness.getTooltipText()).toEqual('My Tooltip');

        await harness.moveCursorAway();
        expect(await harness.isTooltipVisible()).toBeFalse();
    });

    it('should reflect the position in the rendered component', async () => {
        const { fixture, component, harness } = await setupTestEnvironment();

        await harness.hover();
        expect(await harness.getTooltipPosition()).toEqual('above');

        await harness.moveCursorAway();

        component.position = 'below';
        fixture.detectChanges();

        await harness.hover();
        expect(await harness.getTooltipPosition()).toEqual('below');

        await harness.moveCursorAway();

        component.position = 'before';
        fixture.detectChanges();

        await harness.hover();
        expect(await harness.getTooltipPosition()).toEqual('before');

        await harness.moveCursorAway();

        component.position = 'after';
        fixture.detectChanges();

        await harness.hover();
        expect(await harness.getTooltipPosition()).toEqual('after');
    });

    it(`should not show the tooltip when it's disabled`, async () => {
        const { fixture, component, harness } = await setupTestEnvironment();

        component.disabled = true;
        fixture.detectChanges();

        await harness.hover();

        expect(await harness.isTooltipVisible()).toBeFalse();
    });
});
