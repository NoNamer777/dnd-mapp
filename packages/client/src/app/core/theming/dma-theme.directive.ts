import { DOCUMENT } from '@angular/common';
import { Directive, HostBinding, inject, Input, OnInit } from '@angular/core';
import { DmaTheme, DmaThemes } from './models';

@Directive({
    selector: '[dmaTheme]',
    standalone: true,
})
export class DmaThemeDirective implements OnInit {
    @Input('dmaTheme')
    set theme(theme: DmaTheme) {
        this._theme = theme;
        this.document.documentElement.setAttribute('data-bs-theme', this._theme);
    }

    @HostBinding('attr.dmaTheme')
    private _theme: DmaTheme;

    private document: Document = inject(DOCUMENT);

    ngOnInit() {
        this.theme = DmaThemes.DARK;
    }
}
