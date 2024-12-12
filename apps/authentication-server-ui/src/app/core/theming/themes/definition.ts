export interface CommonThemeVariables {
    '--fw-regular': number;
    '--fw-bold': number;

    '--icon-size': string;
    '--border-radius': string;

    '--opacity-disabled': number;
}

export interface ThemeVariables extends CommonThemeVariables {
    '--background': string;
    '--on-background': string;

    '--inverse-background': string;
    '--on-inverse-background': string;

    '--surface': string;
    '--surface-hover': string;
    '--surface-active': string;
    '--on-surface': string;

    '--primary': string;
    '--primary-hover': string;
    '--primary-active': string;
    '--on-primary': string;

    '--danger': string;
    '--danger-hover': string;
    '--danger-active': string;
    '--on-danger': string;

    '--success': string;
    '--on-success': string;

    '--warning': string;
    '--on-warning': string;
}
