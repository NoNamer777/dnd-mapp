import { manualChangeDetection } from '@angular/cdk/testing';
import { Component, signal } from '@angular/core';
import { TooltipAnchorHarness, createTestEnvironment } from '@dnd-mapp/authentication-server-ui/testing';
import { ButtonComponent } from '../button';
import { TooltipOrientation, TooltipPosition } from './models';
import { TooltipModule } from './tooltip.module';

describe('TooltipDirective', () => {
    @Component({
        template: `
            <div>
                <button
                    dma-button
                    dmaTooltip="My Tooltip label"
                    [tooltipPosition]="position()"
                    [tooltipOrientation]="orientation()"
                >
                    My Button
                </button>
            </div>
        `,
        styles: `
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 20em;
                width: 20em;
            }
        `,
    })
    class TestComponent {
        public readonly orientation = signal<TooltipOrientation>(null);
        public readonly position = signal<TooltipPosition>(null);
    }

    interface SetupTestParams {
        orientation?: TooltipOrientation;
        position?: TooltipPosition;
    }

    async function setupTest(params: SetupTestParams = {}) {
        const { harness, component, fixture } = await createTestEnvironment({
            imports: [TooltipModule, ButtonComponent],
            testComponent: TestComponent,
            harness: TooltipAnchorHarness,
        });

        if (params.orientation) {
            component.orientation.set(params.orientation);
        }
        if (params.position) {
            component.position.set(params.position);
        }
        return { harness, component, fixture };
    }

    it('should show tooltip', async () => {
        const { harness } = await setupTest();

        expect(await harness.isTooltipAdded()).toBeFalse();

        await harness.hoverOverAnchor();

        expect(await harness.isTooltipVisible()).toBeTrue();
        expect(await harness.getTooltipLabel()).toEqual('My Tooltip label');
        expect(await harness.tooltipIsPositionedAt('top')).toBeTrue();

        await harness.mouseAwayFromAnchor();
        expect(await harness.isTooltipAdded()).toBeFalse();
    });

    it('should keep showing the tooltip on hovering cursor over tooltip', async () => {
        const { harness, fixture } = await setupTest();

        expect(await harness.isTooltipAdded()).toBeFalse();

        await harness.hoverOverAnchor();

        expect(await harness.isTooltipVisible()).toBeTrue();

        await manualChangeDetection(async () => {
            await harness.mouseAwayFromAnchor();
            await harness.hoverOverTooltip();

            fixture.detectChanges();
            await fixture.whenStable();

            expect(await harness.isTooltipVisible()).toBeTrue();
        });

        await harness.mouseAwayFromTooltip();

        expect(await harness.isTooltipAdded()).toBeFalse();
    });

    it('should clean up tooltip when mouse away before show', async () => {
        const { harness, fixture } = await setupTest();

        expect(await harness.isTooltipAdded()).toBeFalse();

        await manualChangeDetection(async () => {
            await harness.hoverOverAnchor();
            await harness.mouseAwayFromTooltip();

            fixture.detectChanges();
            expect(await harness.isTooltipAdded()).toBeTrue();

            await fixture.whenStable();

            expect(await harness.isTooltipAdded()).toBeFalse();
        });
    });

    it('should set the tooltip on a horizontal orientation', async () => {
        const { harness } = await setupTest({ orientation: 'horizontal' });

        await harness.hoverOverAnchor();
        expect(await harness.tooltipIsPositionedAt('start')).toBeTrue();
    });

    it('should update the position when the orientation changes', async () => {
        const { harness, component } = await setupTest({ orientation: 'horizontal' });

        await harness.hoverOverAnchor();
        expect(await harness.tooltipIsPositionedAt('start')).toBeTrue();

        component.orientation.set('vertical');

        expect(await harness.tooltipIsPositionedAt('top')).toBeTrue();
    });

    it('should fallback to a vertical orientation on unknown values', async () => {
        const { harness } = await setupTest({ orientation: 'horizontala' as TooltipOrientation });

        await harness.hoverOverAnchor();
        expect(await harness.tooltipIsPositionedAt('top')).toBeTrue();
    });

    describe('With position', () => {
        it('should show on top position', async () => {
            const { harness } = await setupTest({ position: 'top' });

            await harness.hoverOverAnchor();
            expect(await harness.tooltipIsPositionedAt('top')).toBeTrue();
        });

        it('should show on bottom position', async () => {
            const { harness } = await setupTest({ position: 'bottom' });

            await harness.hoverOverAnchor();
            expect(await harness.tooltipIsPositionedAt('bottom')).toBeTrue();
        });

        it('should show on start position', async () => {
            const { harness } = await setupTest({ position: 'start' });

            await harness.hoverOverAnchor();
            expect(await harness.tooltipIsPositionedAt('start')).toBeTrue();
        });

        it('should show on end position', async () => {
            const { harness } = await setupTest({ position: 'end' });

            await harness.hoverOverAnchor();
            expect(await harness.tooltipIsPositionedAt('end')).toBeTrue();
        });
    });

    describe('With valid orientation and position combinations', () => {
        it('should throw error for vertical orientation and start position', async () => {
            const { harness } = await setupTest({ orientation: 'vertical', position: 'start' });

            await expectAsync(harness.hoverOverAnchor()).toBeRejectedWithError(
                'Invalid Tooltip Position "start" and Tooltip orientation "vertical" combination'
            );
        });

        it('should throw error for vertical orientation and end position', async () => {
            const { harness } = await setupTest({ orientation: 'vertical', position: 'end' });

            await expectAsync(harness.hoverOverAnchor()).toBeRejectedWithError(
                'Invalid Tooltip Position "end" and Tooltip orientation "vertical" combination'
            );
        });

        it('should throw error for horizontal orientation and top position', async () => {
            const { harness } = await setupTest({ orientation: 'horizontal', position: 'top' });

            await expectAsync(harness.hoverOverAnchor()).toBeRejectedWithError(
                'Invalid Tooltip Position "top" and Tooltip orientation "horizontal" combination'
            );
        });

        it('should throw error for horizontal orientation and bottom position', async () => {
            const { harness } = await setupTest({ orientation: 'horizontal', position: 'bottom' });

            await expectAsync(harness.hoverOverAnchor()).toBeRejectedWithError(
                'Invalid Tooltip Position "bottom" and Tooltip orientation "horizontal" combination'
            );
        });
    });
});
