import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[dmaMenuTrigger]',
    exportAs: 'dmaMenuTrigger',
    standalone: true,
})
export class DmaMenuTriggerDirective {
    @Input() triggerClass: string;

    @Input() open = false;

    @Output() readonly openChange = new EventEmitter<boolean>();

    disabled = false;

    overlayOrigin: CdkOverlayOrigin;

    @HostListener('click', ['$event.target'])
    onToggle(target?: EventTarget) {
        if (this.disabled) return;
        if (!this.triggerClass || !target) {
            this.toggle();
        }
        let element: HTMLElement = target as HTMLElement;

        while (element) {
            if (element.classList.contains(this.triggerClass)) {
                this.toggle();
                break;
            }
            element = element.parentElement;
        }
    }

    get positions(): ConnectedPosition[] {
        return [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
        ];
    }

    private toggle() {
        this.open = !this.open;
        this.openChange.emit(this.open);
    }
}
