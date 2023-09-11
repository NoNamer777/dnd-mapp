import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DmaTooltipComponent } from './dma-tooltip.component';

export type DmaTooltipPosition = 'above' | 'below' | 'after' | 'before';

@Directive({
    selector: '[dmaTooltip]',
    standalone: true,
})
export class DmaTooltipDirective implements OnInit {
    @Input('dmaTooltip')
    @HostBinding('attr.dmaTooltip')
    tooltipText: string;

    @Output() positionChange = new EventEmitter<DmaTooltipPosition>();

    @Input('dmaTooltipPosition')
    @HostBinding('attr.dmaTooltipPosition')
    set position(position: DmaTooltipPosition) {
        this._position = position;
        this.positionChange.next(this._position);

        this.configureOverlay();
    }
    get position() {
        return this._position;
    }
    private _position: DmaTooltipPosition = 'above';

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private scrollStrategyOptions: ScrollStrategyOptions
    ) {}

    ngOnInit() {
        this.configureOverlay();
    }

    @HostListener('mouseenter')
    onShowTooltip() {
        const tooltipRef = this.overlayRef.attach(new ComponentPortal(DmaTooltipComponent));

        tooltipRef.instance.text = this.tooltipText;
        tooltipRef.instance.position = this.position;
    }

    @HostListener('mouseleave')
    onHideTooltip() {
        this.overlayRef.detach();
    }

    private configureOverlay() {
        // Dispose of the previously configured overlay to keep the DOM clean.
        this.overlayRef?.dispose();

        const elementWidth = (this.elementRef.nativeElement as HTMLElement).clientWidth;
        const overlayPositionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withGrowAfterOpen(false)
            .withPush(false)
            .withLockedPosition(false)
            .withPositions([this.positions]);

        this.overlayRef = this.overlay.create({
            panelClass: 'dma-tooltip-overlay',
            width: elementWidth,
            positionStrategy: overlayPositionStrategy,
            scrollStrategy: this.scrollStrategyOptions.reposition({ autoClose: true, scrollThrottle: 500 }),
            hasBackdrop: false,
            disposeOnNavigation: true,
        });
    }

    private get positions(): ConnectedPosition {
        switch (this.position) {
            case 'after':
                return {
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center',
                };
            case 'before':
                return {
                    originX: 'start',
                    originY: 'center',
                    overlayX: 'end',
                    overlayY: 'center',
                };
            case 'below':
                return {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                };
            case 'above':
            default:
                return {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                };
        }
    }
}
