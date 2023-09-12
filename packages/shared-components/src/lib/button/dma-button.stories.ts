import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconsModule } from '../icons';
import { DmaButtonComponent } from './dma-button.component';

type Story = StoryObj<DmaButtonComponent>;

const meta: Meta<DmaButtonComponent> = {
    component: DmaButtonComponent,
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

export default {
    title: 'Dma-button',
    ...meta,
};

export const Common: Story = {
    render: (args: DmaButtonComponent) => ({
        props: args,
        template: `<button [dma-button]="dmaButtonType" [disabled]="disabled">Button</button>`,
    }),
};

export const WithIcon: Story = {
    ...Common,
    decorators: [moduleMetadata({ imports: [DmaIconsModule] })],
    render: (args: DmaButtonComponent) => ({
        props: args,
        template: `
            <button [dma-button]="dmaButtonType" [disabled]="disabled">
                <dma-icon dma-plus-icon />
                Button
            </button>`,
    }),
};
