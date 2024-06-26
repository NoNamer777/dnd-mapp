import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DmaIconName, DmaIconType, DmaIconTypes, dmaIconNameAttribute, dmaIconTypeAttribute } from './models';

@Component({
    selector: 'dma-icon',
    template: ``,
    styleUrl: './dma-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class DmaIconComponent {
    get icon() {
        return this._icon;
    }
    @Input({ transform: dmaIconNameAttribute }) set icon(icon: DmaIconName) {
        this._icon = icon;
        this.getIconTemplate();
    }
    @HostBinding('attr.icon')
    private _icon: DmaIconName;

    get iconType() {
        return this._iconType;
    }
    @Input({ transform: dmaIconTypeAttribute }) set iconType(type: DmaIconType) {
        this._iconType = type;
        this.getIconTemplate();
    }
    @HostBinding('attr.icon-type')
    private _iconType: DmaIconType = DmaIconTypes.SOLID;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    private async getIconTemplate() {
        const response = await fetch(`./assets/icons/${this.iconType}/dma-${this.icon}.icon.svg`);

        this.elementRef.nativeElement.innerHTML = await response.text();
        this.changeDetectorRef.markForCheck();
    }
}
