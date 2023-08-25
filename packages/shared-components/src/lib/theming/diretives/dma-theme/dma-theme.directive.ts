import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { DmaThemeService } from '../../services/dma-theme/dma-theme.service';
import { DmaTheme, isDmaTheme } from '../../models';

@Directive({
    selector: '[dmaTheme]',
    providers: [DmaThemeService],
})
export class DmaThemeDirective implements OnInit {
    @Input() set dmaTheme(theme: DmaTheme) {
        if (!isDmaTheme(theme)) return;

        this._theme = theme;
    }

    @HostBinding('attr.style')
    styling: string;

    @HostBinding('attr.dmaTheme')
    private _theme: DmaTheme = 'light';

    constructor(private dmaThemeService: DmaThemeService) {}

    ngOnInit() {
        this.dmaThemeService.theme = this._theme;
        this.styling = this.dmaThemeService.initializeTheme();
    }
}
