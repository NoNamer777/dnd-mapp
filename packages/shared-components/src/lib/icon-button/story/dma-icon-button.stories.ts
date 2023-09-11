import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconButtonComponent } from '../dma-icon-button.component';
import { DmaIconsModule } from '../../icons';

type Story = StoryObj<DmaIconButtonComponent>;

const meta: Meta<DmaIconButtonComponent> = {
    component: DmaIconButtonComponent,
    decorators: [moduleMetadata({ imports: [DmaIconsModule] })],
    argTypes: {
        toggle: {
            name: 'Toggle',
            description: 'Whether the icon button toggles between unselected and selected state.',
            table: {
                defaultValue: {
                    summary: false,
                },
            },
        },
        disabled: {
            name: 'Disabled',
            control: 'boolean',
            description: 'Whether the icon button is disabled.',
            defaultValue: {
                summary: false,
            },
        },
        dmaButtonType: {
            name: 'Icon button type',
            control: 'select',
            options: ['filled', 'tonal', 'outlined', 'standard'],
            description: 'The type of icon button.',
            type: {
                name: 'string',
                required: true,
            },
            table: {
                defaultValue: {
                    summary: 'standard',
                },
            },
        },
        dmaIconButtonLabel: {
            name: 'Label - text',
            control: 'text',
            type: {
                name: 'string',
                required: true,
            },
            description: 'The label of the icon button which should provide context of what the button does.',
        },
        dmaIconButtonLabelPosition: {
            name: 'Label - position',
            control: 'select',
            options: ['above', 'after', 'below', 'before'],
            defaultValue: {
                summary: 'above',
            },
            description: 'The placement of the label.',
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
