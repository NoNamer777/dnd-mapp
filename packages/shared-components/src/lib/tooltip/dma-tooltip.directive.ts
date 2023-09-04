import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DmaTooltipComponent } from './dma-tooltip.component';

const defaultDmaTooltipPositions: ConnectedPosition[] = [
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
    },
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
    },
];

@Directive({
    selector: '[dmaTooltip]',
})
export class DmaTooltipDirective implements OnInit {
    @Input('dmaTooltip')
    @HostBinding('attr.dmaTooltip')
    tooltipText: string;

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private scrollStrategyOptions: ScrollStrategyOptions,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {
        const overlayPosition = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withGrowAfterOpen(false)
            .withPush(false)
            .withPositions(defaultDmaTooltipPositions);

        this.overlayRef = this.overlay.create({
            positionStrategy: overlayPosition,
            scrollStrategy: this.scrollStrategyOptions.reposition({ autoClose: true, scrollThrottle: 500 }),
            hasBackdrop: false,
            disposeOnNavigation: true,
        });
        const tooltipRef = this.overlayRef.attach(new ComponentPortal(DmaTooltipComponent, this.viewContainerRef));

        tooltipRef.instance.text = this.tooltipText;
    }

    @HostListener('mouseenter')
    onShowTooltip() {
        const tooltipRef = this.overlayRef.attach(new ComponentPortal(DmaTooltipComponent, this.viewContainerRef));

        tooltipRef.instance.text = this.tooltipText;
    }

    @HostListener('mouseleave')
    onHideTooltip() {
        this.overlayRef.detach();
    }
}
