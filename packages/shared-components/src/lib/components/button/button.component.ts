import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type DmaButtonType = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';

const buttonTypeAttributeName = 'dma-button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    template: `<ng-content />`,
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
    @Input('dma-button') set dmaButtonType(buttonType: DmaButtonType) {
        this.buttonType = buttonType;

        this.updateRenderedAttribute();
    }

    private buttonType: DmaButtonType = 'text';

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        this.renderer.setAttribute(this.elementRef.nativeElement, buttonTypeAttributeName, this.buttonType);
    }
}
