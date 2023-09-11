import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
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
        dmaIconButtonLabelPosition: {
            control: 'select',
            options: ['above', 'after', 'below', 'before'],
        },
    } as Partial<ArgTypes<DmaIconButtonComponent>>,
    args: {
        disabled: false,
        dmaButtonType: 'standard',
        dmaIconButtonLabel: 'My icon button label',
        dmaIconButtonLabelPosition: 'after',
    } as Partial<DmaIconButtonComponent> & Partial<HTMLButtonElement>,
};

export default {
    title: 'DmaIconButton',
    ...meta,
};

export const Standard: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `<button [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled"><dma-icon dma-plus-so-icon /></button>`,
    }),
};

export const Toggle: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `
            <button toggle [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled">
                <dma-icon dma-star-re-icon class="dma-icon-button-unselected" />
                <dma-icon dma-star-so-icon class="dma-icon-button-selected" />
            </button>`,
    }),
};
