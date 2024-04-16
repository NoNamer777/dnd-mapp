import { DOCUMENT } from '@angular/common';
import { Directive, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { DmaTheme, DmaThemes, dmaThemeAttribute } from '../../models';
import { DmaThemeService } from '../../services/dma-theme/dma-theme.service';

@Directive({
    selector: '[dmaTheme]',
    providers: [DmaThemeService],
    standalone: true,
})
export class DmaThemeDirective implements OnInit {
    @Input({ transform: dmaThemeAttribute }) set dmaTheme(theme: DmaTheme) {
        this._theme = theme;
    }

    @HostBinding('attr.dmaTheme')
    private _theme: DmaTheme = DmaThemes.DARK;

    constructor(
        private dmaThemeService: DmaThemeService,
        @Inject(DOCUMENT) private doc: Document
    ) {}

    ngOnInit() {
        this.dmaThemeService.theme = this._theme;
        this.dmaThemeService.initializeTheme(this.doc.documentElement);
    }
}
