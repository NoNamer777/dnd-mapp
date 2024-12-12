import { common } from './common';
import { ThemeVariables } from './definition';

const theme: ThemeVariables = {
    ...common,
    '--background': '#1f1f1f',
    '--on-background': '#f2f2f2',
    '--inverse-background': '#f2f2f2',
    '--on-inverse-background': '#010101',

    '--surface': '#2e2e2e',
    '--surface-hover': '#383838',
    '--surface-active': '#2c2c2c',
    '--on-surface': '#f2f2f2',

    '--primary': '#3e78ff',
    '--primary-hover': '#487fff',
    '--primary-active': '#2e6dff',
    '--on-primary': '#f2f2f2',

    '--danger': '#de0000',
    '--danger-hover': '#ec0000',
    '--danger-active': '#d30000',
    '--on-danger': '#f2f2f2',

    '--warning': '#ffa500',
    '--on-warning': '#010101',

    '--success': '#009e00',
    '--on-success': '#f2f2f2',
};

export default theme;
