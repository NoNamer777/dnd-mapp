import { dmaLightTheme } from './themes';
import { dmaDarkTheme } from './themes/dark';

export enum DmaThemes {
    LIGHT = 'light',
    DARK = 'dark',
}

export type DmaTheme = (typeof DmaThemes)[keyof typeof DmaThemes];

export function dmaThemeAttribute(theme: string | DmaThemes) {
    return Object.values(DmaThemes as unknown as string[]).includes(theme) ? (theme as DmaThemes) : DmaThemes.DARK;
}

export type ThemeVariables =
    | '--background'
    | '--on-background'
    | '--surface'
    | '--on-surface'
    | '--primary'
    | '--on-primary'
    | '--secondary'
    | '--on-secondary'
    | '--success'
    | '--on-success'
    | '--error'
    | '--on-error'
    | '--shadow'
    | '--font-family'
    | '--font-size'
    | '--fw-regular'
    | '--fw-bold'
    | '--opacity-disabled';

export type DmaThemeMap = Record<ThemeVariables, string>;

export const dmaThemes = new Map<DmaTheme, DmaThemeMap>([
    [DmaThemes.LIGHT, dmaLightTheme],
    [DmaThemes.DARK, dmaDarkTheme],
]);
