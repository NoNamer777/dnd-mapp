import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener } from '@angular/core';

@Component({
    selector: 'dma-state',
    template: '',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class StateComponent {
    @HostBinding('attr.dma-focus')
    protected isFocussed: string;

    @HostBinding('attr.dma-hover')
    protected isHovered: string;

    @HostBinding('attr.dma-press')
    protected isPressed: string;

    @HostBinding('attr.dma-drag')
    protected isDragged: string;

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
        if (this.isDisabled()) return;

        this.opacity += 12;
        this.isFocussed = '';
    }

    @HostListener('window:keypress.escape')
    @HostListener('blur')
    onStopFocussing() {
        if (!this.isStateActive(this.isFocussed)) return;

        this.opacity -= 12;
        this.isFocussed = undefined;
    }

    @HostListener('mouseover')
    onStartHovering() {
        if (this.isDisabled()) return;

        this.opacity += 8;
        this.isHovered = '';
    }

    @HostListener('mouseout')
    onStopHovering() {
        if (!this.isStateActive(this.isHovered)) return;

        this.opacity -= 8;
        this.isHovered = undefined;
    }

    @HostListener('mousedown')
    onStartClicking() {
        if (this.isDisabled()) return;

        this.opacity += 12;
        this.isPressed = '';
    }

    @HostListener('window:mouseup')
    onStopClicking() {
        if (!this.isStateActive(this.isPressed)) return;

        this.opacity -= 12;
        this.isPressed = undefined;
    }

    @HostListener('dragstart')
    onStartDragging() {
        if (this.isDisabled()) return;

        this.opacity += 16;
        this.isDragged = '';
    }

    @HostListener('dragend')
    onStopDragging() {
        if (!this.isStateActive(this.isDragged)) return;

        this.opacity -= 16;
        this.isDragged = undefined;
    }

    private isStateActive(state: string) {
        return state === '';
    }

    private isDisabled() {
        return (this.elementRef.nativeElement as HTMLElement).getAttribute('disabled') === '';
    }
}
