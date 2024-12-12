import { Directive, ElementRef, HostBinding, inject, Input, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { Theme, themeAttribute } from './themes';

@Directive({
    selector: '[dmaTheme]',
    standalone: true,
    providers: [ThemeService],
})
export class ThemeDirective implements OnInit {
    private readonly elementRef = inject(ElementRef);
    private readonly themeService = inject(ThemeService);

    public set theme(theme: Theme) {
        this.themeService.theme = theme;

        this.refreshThemeVariables();
    }

    @HostBinding('attr.dmaTheme')
    @Input({ transform: themeAttribute, alias: 'dmaTheme' })
    public get theme() {
        return this.themeService.theme;
    }

    public ngOnInit() {
        this.refreshThemeVariables();
    }

    private refreshThemeVariables() {
        this.themeService.initialize(this.elementRef.nativeElement);
    }
}
