import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
    title: 'Button',
    component: ButtonComponent,
} as Meta<ButtonComponent>;

export const Primary: StoryObj<ButtonComponent> = {
    render: (args: ButtonComponent) => ({
        props: args,
        template: `<button [dma-button]="dmaButtonType" [disabled]="disabled">Button</button>`,
    }),
    args: {
        disabled: false,
        dmaButtonType: 'text',
    } as Partial<ButtonComponent> & Partial<HTMLButtonElement>,
    argTypes: {
        dmaButtonType: {
            control: 'select',
            options: ['elevated', 'filled', 'tonal', 'outlined', 'text'],
        },
    },
};
