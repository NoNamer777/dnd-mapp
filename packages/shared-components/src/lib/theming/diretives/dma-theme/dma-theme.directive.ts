import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { DmaThemeService } from '../../services/dma-theme/dma-theme.service';
import { DmaTheme, isDmaTheme } from '../../models';

@Directive({
    selector: '[dmaTheme]',
    providers: [DmaThemeService],
})
    @Input('dmaTheme') set(theme: DmaTheme) {
export class DmaThemeDirective implements OnInit {
        if (!isDmaTheme(theme)) return;

        this._theme = theme;
    }

    @HostBinding('attr.style')
    styling: string;

    private _theme: DmaTheme = 'light';

    constructor(private dmaThemeService: DmaThemeService) {}

    ngOnInit() {
        this.dmaThemeService.theme = this._theme;
        this.styling = this.dmaThemeService.initializeTheme();
    }
}
