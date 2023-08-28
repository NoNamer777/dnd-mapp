import { Meta, StoryObj } from '@storybook/angular';
import { DmaButtonComponent } from './dma-button.component';

export default {
    title: 'Button',
    component: DmaButtonComponent,
} as Meta<DmaButtonComponent>;

export const Primary: StoryObj<DmaButtonComponent> = {
    render: (args: DmaButtonComponent) => ({
        props: args,
        template: `<button [dma-button]="dmaButtonType" [disabled]="disabled">Button</button>`,
    }),
    args: {
        disabled: false,
        dmaButtonType: 'text',
    } as Partial<DmaButtonComponent> & Partial<HTMLButtonElement>,
    argTypes: {
        dmaButtonType: {
            control: 'select',
            options: ['elevated', 'filled', 'tonal', 'outlined', 'text'],
        },
    },
};
