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
    @HostBinding('attr.dma-focussed')
    get focussed() {
        return this.isFocussed ? '' : undefined;
    }
    protected isFocussed = false;

    @HostBinding('attr.dma-hovered')
    get hovered() {
        return this.isHovered ? '' : undefined;
    }
    protected isHovered = false;

    @HostBinding('attr.dma-pressed')
    get pressed() {
        return this.isPressed ? '' : undefined;
    }
    protected isPressed = false;

    @HostBinding('attr.dma-dragging')
    get dragging() {
        return this.isDragging ? '' : undefined;
    }
    protected isDragging = false;

    protected stateLayerOpacity = 0;
    protected baseColor = 'transparent';
    protected layerColor = 'transparent';

    constructor(private readonly elementRef: ElementRef) {}

    resetStateLayer() {
        this.stateLayerOpacity = 0;
        this.isDragging = false;
        this.isFocussed = false;
        this.isPressed = false;
        this.isHovered = false;
    }

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return `color-mix(in srgb, ${this.baseColor} ${100 - this.stateLayerOpacity}%, ${this.layerColor})`;
    }

    @HostListener('focus')
    onStartFocussing() {
        if (this.isDisabled) return;

        this.stateLayerOpacity += opacityPerState.get('focussed');
        this.isFocussed = true;
    }

    @HostListener('blur')
    onStopFocussing() {
        if (!this.isFocussed) return;

        this.stateLayerOpacity -= opacityPerState.get('focussed');
        this.isFocussed = false;
    }

    @HostListener('mouseenter')
    onStartHovering() {
        if (this.isDisabled || this.isHovered) return;

        this.stateLayerOpacity += opacityPerState.get('hovered');
        this.isHovered = true;
    }

    @HostListener('mouseleave')
    onStopHovering() {
        if (!this.isHovered) return;

        this.stateLayerOpacity -= opacityPerState.get('hovered');
        this.isHovered = false;
    }

    @HostListener('mousedown', ['$event.button'])
    onStartClicking(button: number) {
        if (this.isDisabled || button !== 0) return;

        this.stateLayerOpacity += opacityPerState.get('pressed');
        this.isPressed = true;
    }

    @HostListener('document:mouseup')
    @HostListener('mouseup')
    onStopClicking() {
        if (!this.isPressed) return;

        this.stateLayerOpacity -= opacityPerState.get('pressed');
        this.isPressed = false;
    }

    @HostListener('dragstart')
    onStartDragging() {
        if (this.isDisabled) return;

        this.stateLayerOpacity += opacityPerState.get('dragging');
        this.isDragging = true;
    }

    @HostListener('dragend')
    onStopDragging() {
        if (!this.isDragging) return;

        this.stateLayerOpacity -= opacityPerState.get('dragging');
        this.isDragging = false;
    }

    private get isDisabled() {
        return this.elementRef.nativeElement.getAttribute('disabled') === '';
    }
}
