import { dmaLightTheme } from './themes';

const dmaTheme = ['light'];

export type DmaTheme = typeof dmaTheme[number];

export function isDmaTheme(value: string): value is DmaTheme {
    return dmaTheme.includes(value);
}

export type DmaThemeMap = Record<string, string>;

export const dmaThemes = new Map<DmaTheme, DmaThemeMap>([['light', dmaLightTheme]]);
