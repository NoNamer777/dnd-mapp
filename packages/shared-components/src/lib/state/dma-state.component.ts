import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener } from '@angular/core';

type State = 'focussed' | 'hovered' | 'pressed' | 'dragging';

const opacityPerState = new Map<State, number>([
    ['focussed', 12],
    ['hovered', 8],
    ['pressed', 12],
    ['dragging', 16],
]);

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[dma-state]',
    template: '',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class DmaStateComponent {
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

    protected opacity = 0;
    protected baseColor = '#ffffff';
    protected layerColor = '#ffffff';

    constructor(private elementRef: ElementRef) {}

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return `color-mix(in srgb, ${this.baseColor}, ${this.layerColor} ${this.opacity}%)`;
    }

    @HostListener('focus')
    onStartFocussing() {
        if (this.isDisabled) return;

        this.opacity += opacityPerState.get('focussed');
        this.isFocussed = true;
    }

    @HostListener('blur')
    onStopFocussing() {
        if (!this.isFocussed) return;

        this.opacity -= opacityPerState.get('focussed');
        this.isFocussed = false;
    }

    @HostListener('mouseover')
    onStartHovering() {
        if (this.isDisabled) return;

        this.opacity += opacityPerState.get('hovered');
        this.isHovered = true;
    }

    @HostListener('mouseout')
    onStopHovering() {
        if (!this.isHovered) return;

        this.opacity -= opacityPerState.get('hovered');
        this.isHovered = false;
    }

    @HostListener('mousedown', ['$event.button'])
    onStartClicking(button: number) {
        if (this.isDisabled || button !== 0) return;

        this.opacity += opacityPerState.get('pressed');
        this.isPressed = true;
    }

    @HostListener('document:mouseup')
    @HostListener('mouseup')
    onStopClicking() {
        if (!this.isPressed) return;

        this.opacity -= opacityPerState.get('pressed');
        this.isPressed = false;
    }

    @HostListener('dragstart')
    onStartDragging() {
        if (this.isDisabled) return;

        this.opacity += opacityPerState.get('dragging');
        this.isDragging = true;
    }

    @HostListener('dragend')
    onStopDragging() {
        if (!this.isDragging) return;

        this.opacity -= opacityPerState.get('dragging');
        this.isDragging = false;
    }

    private get isDisabled() {
        return this.elementRef.nativeElement.getAttribute('disabled') === '';
    }
}
