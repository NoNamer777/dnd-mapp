export enum DmaThemes {
    LIGHT = 'light',
    DARK = 'dark',
}

export type DmaTheme = (typeof DmaThemes)[keyof typeof DmaThemes];
