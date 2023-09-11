import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconButtonComponent } from '../dma-icon-button.component';
import { DmaIconsModule } from '../../icons';

type Story = StoryObj<DmaIconButtonComponent>;

const meta: Meta<DmaIconButtonComponent> = {
    component: DmaIconButtonComponent,
    decorators: [moduleMetadata({ imports: [DmaIconsModule] })],
    argTypes: {
        dmaButtonType: {
            control: 'select',
            options: ['filled', 'tonal', 'outlined', 'standard'],
        },
    },
    args: {
        disabled: false,
        toggle: false,
        dmaButtonType: 'standard',
    } as Partial<DmaIconButtonComponent> & Partial<HTMLButtonElement>,
};

export default {
    title: 'DmaIconButton',
    ...meta,
};

export const Standard: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `<button [dma-icon-button]="dmaButtonType" [disabled]="disabled" [toggle]="toggle"><dma-icon dma-star-icon /></button>`,
    }),
};