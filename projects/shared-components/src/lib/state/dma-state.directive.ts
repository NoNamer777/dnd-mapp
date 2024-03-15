import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

type State = 'focussed' | 'hovered' | 'pressed' | 'dragging';

export interface StateColors {
    baseLayer: string;
    stateLayer: string;

    [layer: string]: string;
}

const opacityPerState = new Map<State, number>([
    ['focussed', 10],
    ['hovered', 8],
    ['pressed', 10],
    ['dragging', 16],
]);

@Directive({
    selector: '[dmaState]',
    standalone: true,
})
export class DmaStateDirective {
    private readonly elementRef = inject(ElementRef);

    @HostBinding('attr.dma-focussed')
    protected get focussed() {
        return this.isFocussed ? '' : undefined;
    }
    protected isFocussed = false;

    @HostBinding('attr.dma-hovered')
    protected get hovered() {
        return this.isHovered ? '' : undefined;
    }
    protected isHovered = false;

    @HostBinding('attr.dma-pressed')
    protected get pressed() {
        return this.isPressed ? '' : undefined;
    }
    protected isPressed = false;

    @HostBinding('attr.dma-dragging')
    protected get dragging() {
        return this.isDragging ? '' : undefined;
    }
    protected isDragging = false;

    protected get baseLayerColor() {
        return 'transparent';
    }
    protected get stateLayerColor() {
        return 'transparent';
    }

    @HostBinding('style.backgroundColor')
    protected get backgroundColor() {
        return `color-mix(in srgb, ${this.baseLayerColor} ${100 - this.stateLayerOpacity}%, ${this.stateLayerColor})`;
    }

    @HostListener('focus')
    protected onStartFocussing() {
        if (this.isDisabled) return;
        this.isFocussed = true;
    }

    @HostListener('blur')
    protected onStopFocussing() {
        if (!this.isFocussed) return;
        this.isFocussed = false;
    }

    @HostListener('mouseenter')
    protected onStartHovering() {
        if (this.isDisabled || this.isHovered) return;
        this.isHovered = true;
    }

    @HostListener('mouseleave')
    protected onStopHovering() {
        if (!this.isHovered) return;
        this.isHovered = false;
    }

    @HostListener('mousedown', ['$event.button'])
    protected onStartClicking(button: number) {
        if (this.isDisabled || button !== 0) return;
        this.isPressed = true;
    }

    @HostListener('document:mouseup')
    @HostListener('mouseup')
    protected onStopClicking() {
        if (!this.isPressed) return;
        this.isPressed = false;
    }

    @HostListener('dragstart')
    protected onStartDragging() {
        if (this.isDisabled) return;
        this.isDragging = true;
    }

    @HostListener('dragend')
    protected onStopDragging() {
        if (!this.isDragging) return;
        this.isDragging = false;
    }

    resetStateLayer() {
        this.isDragging = false;
        this.isFocussed = false;
        this.isPressed = false;
        this.isHovered = false;
    }

    private get isDisabled() {
        return this.elementRef.nativeElement.getAttribute('disabled') === '';
    }

    private get stateLayerOpacity() {
        let opacity = 0;

        for (const [state, stateOpacity] of opacityPerState.entries()) {
            if (this[state] === undefined) continue;
            opacity += stateOpacity;
        }
        return opacity;
    }
}
