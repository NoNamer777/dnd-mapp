import { Injectable } from '@angular/core';
import { getVariables, Theme, Themes } from './themes';

@Injectable()
export class ThemeService {
    public theme: Theme = Themes.DARK;

    public initialize(element: HTMLElement) {
        this.clearThemeVariables(element);
        let styleAttr = '';

        Object.entries(getVariables(this.theme)).forEach(([key, value]) => {
            styleAttr += `${key}: ${value}; `;
        });

        element.setAttribute('style', styleAttr.trim());
    }

    private clearThemeVariables(element: HTMLElement) {
        element.setAttribute('style', '');
    }
}
