import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';

export enum DmaIcons {
    BARS = 'bars',
    BOOK = 'book',
    PLUS = 'plus',
    STAR = 'star',
    USERS = 'users',
    WAND_SPARKLES = 'wand-sparkles',
}

export enum DmaIconTypes {
    SOLID = 'solid',
    REGULAR = 'regular',
}

export type DmaIconName = (typeof DmaIcons)[keyof typeof DmaIcons];

export type DmaIconType = (typeof DmaIconTypes)[keyof typeof DmaIconTypes];

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
    @Input() set icon(icon: DmaIconName) {
        this._icon = icon;
        this.getIconTemplate();
    }
    private _icon: DmaIconName;

    get iconType() {
        return this._iconType;
    }
    @Input() set iconType(type: DmaIconType) {
        this._iconType = type;
        this.getIconTemplate();
    }
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
