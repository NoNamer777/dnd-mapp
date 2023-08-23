import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { StateComponent } from '../state';

type DmaButtonType = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';

const buttonTypeAttributeName = 'dma-button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    template: `<ng-content />`,
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends StateComponent implements OnInit {
    @Input('dma-button') set dmaButtonType(buttonType: DmaButtonType) {
        this.buttonType = buttonType;

        this.updateRenderedAttribute();
    }

    @HostBinding('attr.dma-button-type')
    private buttonType: DmaButtonType = 'text';

    ngOnInit() {
        this.updateRenderedAttribute();
    }

    private updateRenderedAttribute() {
        this.renderer.setAttribute(this.elementRef.nativeElement, buttonTypeAttributeName, this.buttonType);
    }
}
