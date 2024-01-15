import { DOCUMENT } from '@angular/common';
import { Directive, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { DmaTheme, isDmaTheme } from '../../models';
import { DmaThemeService } from '../../services/dma-theme/dma-theme.service';

@Directive({
    selector: '[dmaTheme]',
    providers: [DmaThemeService],
})
export class DmaThemeDirective implements OnInit {
    @Input() set dmaTheme(theme: DmaTheme) {
        if (!isDmaTheme(theme)) return;

        this._theme = theme;
    }

    @HostBinding('attr.dmaTheme')
    private _theme: DmaTheme = 'light';

    constructor(
        private dmaThemeService: DmaThemeService,
        @Inject(DOCUMENT) private doc: Document
    ) {}

    ngOnInit() {
        this.dmaThemeService.theme = this._theme;
        this.dmaThemeService.initializeTheme(this.doc.documentElement);
    }
}
