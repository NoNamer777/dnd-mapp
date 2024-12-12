import themeVariablesDark from './themes/dark';
import themeVariablesLight from './themes/light';

export const Themes = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export function themeAttribute(value: string) {
    return Object.values(Themes).find((theme) => value === theme) ?? Themes.DARK;
}

export function getVariables(theme: Theme) {
    switch (theme) {
        case Themes.LIGHT:
            return themeVariablesLight;
        default:
            return themeVariablesDark;
    }
}
