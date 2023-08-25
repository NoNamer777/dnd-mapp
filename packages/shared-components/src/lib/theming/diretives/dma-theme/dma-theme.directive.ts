import { AfterViewInit, Directive, HostBinding, Input } from '@angular/core';
import { DmaThemeService } from '../../services/dma-theme/dma-theme.service';
import { DmaTheme, isDmaTheme } from '../../models';

@Directive({
    selector: '[dmaTheme]',
    providers: [DmaThemeService],
})
export class DmaThemeDirective implements AfterViewInit {
    @Input('dmaTheme') set(theme: DmaTheme) {
        if (!isDmaTheme(theme)) return;

        this._theme = theme;
    }

    @HostBinding('attr.style')
    styling: string;

    private _theme: DmaTheme = 'light';

    constructor(private dmaThemeService: DmaThemeService) {}

    ngAfterViewInit() {
        this.dmaThemeService.theme = this._theme;
        this.styling = this.dmaThemeService.initializeTheme();
    }
}
