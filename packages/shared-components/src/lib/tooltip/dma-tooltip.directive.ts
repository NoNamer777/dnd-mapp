import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[dmaTooltip]',
})
export class DmaTooltipDirective {
    @Input('dmaTooltip') set tooltipText(tooltipText: string) {
        console.log(tooltipText);
    }

    @HostListener('mouseenter')
    onShowTooltip() {
        console.log('showing tooltip');
    }

    @HostListener('mouseleave')
    onHideTooltip() {
        console.log('hiding tooltip');
    }
}
