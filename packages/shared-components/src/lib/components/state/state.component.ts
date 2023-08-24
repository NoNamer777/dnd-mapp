import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
export class StateComponent {
    @Input()
    set disabled(disabled: string | boolean) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    private _disabled = false;

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

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return `color-mix(in srgb, ${this.baseColor}, ${this.layerColor} ${this.opacity}%)`;
    }

    @HostListener('focus')
    onStartFocussing() {
        if (this._disabled) return;

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
        if (this._disabled) return;

        this.opacity += opacityPerState.get('hovered');
        this.isHovered = true;
    }

    @HostListener('mouseout')
    onStopHovering() {
        if (!this.isHovered) return;

        this.opacity -= opacityPerState.get('hovered');
        this.isHovered = false;
    }

    @HostListener('mousedown')
    onStartClicking() {
        if (this._disabled) return;

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
        if (this._disabled) return;

        this.opacity += opacityPerState.get('dragging');
        this.isDragging = true;
    }

    @HostListener('dragend')
    onStopDragging() {
        if (!this.isDragging) return;

        this.opacity -= opacityPerState.get('dragging');
        this.isDragging = false;
    }
}
