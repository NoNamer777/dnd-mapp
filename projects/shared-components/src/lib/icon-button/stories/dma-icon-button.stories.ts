import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconComponent } from '../../icons';
import { DmaIconButtonComponent } from '../dma-icon-button.component';

type Story = StoryObj<DmaIconButtonComponent>;

const meta: Meta<DmaIconButtonComponent> = {
    title: 'DmaIconButton',
    component: DmaIconButtonComponent,
    decorators: [moduleMetadata({ imports: [DmaIconButtonComponent, DmaIconComponent] })],
    argTypes: {
        toggle: {
            description: 'Whether the icon button toggles between unselected and selected state.',
            defaultValue: {
                summary: false,
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the icon button is disabled.',
            defaultValue: {
                summary: false,
            },
        },
        dmaButtonType: {
            control: 'select',
            options: ['filled', 'tonal', 'outlined', 'standard'],
            description: 'The type of icon button.',
            type: {
                name: 'string',
                required: true,
            },
            defaultValue: {
                summary: 'standard',
            },
        },
        dmaIconButtonLabel: {
            control: 'text',
            description: 'The label of the icon button which should provide context of what the button does.',
            type: {
                name: 'string',
            },
        },
        dmaIconButtonLabelPosition: {
            control: 'select',
            options: ['above', 'after', 'below', 'before'],
            description: 'The placement of the label.',
            defaultValue: {
                summary: 'above',
            },
        },
    } as Partial<ArgTypes<DmaIconButtonComponent>>,
    args: {
        disabled: false,
        dmaButtonType: 'standard',
        dmaIconButtonLabel: 'My icon button label',
        dmaIconButtonLabelPosition: 'after',
    } as Partial<DmaIconButtonComponent>,
};

export default meta;

export const Common: Story = {
    render: () => ({
        template: `
            <article class="row">
                <button dma-icon-button="filled" dmaIconButtonLabel="Filled">
                    <dma-icon icon="plus"></dma-icon>                
                </button>
                <button dma-icon-button="tonal" dmaIconButtonLabel="Tonal">
                    <dma-icon icon="plus"></dma-icon>
                </button>
                <button dma-icon-button="outlined" dmaIconButtonLabel="Outlined">
                    <dma-icon icon="plus"></dma-icon>
                </button>
                <button dma-icon-button dmaIconButtonLabel="Standard (Default)">
                    <dma-icon icon="plus"></dma-icon>
                </button>
            </article>
        `,
    }),
};

export const StandardInteractive: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `<button [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled"><dma-icon icon="plus"></dma-icon></button>`,
    }),
};

export const ToggleInteractive: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `
            <button toggle [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled">
                <dma-icon icon="star" iconType="regular" ngProjectAs="unselected-icon" />
                <dma-icon icon="star" ngProjectAs="selected-icon" />
            </button>`,
    }),
};
