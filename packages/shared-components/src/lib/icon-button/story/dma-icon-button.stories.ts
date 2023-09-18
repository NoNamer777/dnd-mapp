import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconsModule } from '../../icons';
import { DmaIconButtonComponent } from '../dma-icon-button.component';

type Story = StoryObj<DmaIconButtonComponent>;

const meta: Meta<DmaIconButtonComponent> = {
    title: 'DmaIconButton',
    component: DmaIconButtonComponent,
    decorators: [moduleMetadata({ imports: [DmaIconsModule] })],
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
                required: true,
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
    } as Partial<DmaIconButtonComponent> & Partial<HTMLButtonElement>,
};

export default meta;

export const Common: Story = {
    render: () => ({
        template: `
            <article class="row">
                <button dma-icon-button="filled" dmaIconButtonLabel="Filled">
                    <dma-icon dma-plus-so-icon></dma-icon>                
                </button>
                <button dma-icon-button="tonal" dmaIconButtonLabel="Tonal">
                    <dma-icon dma-plus-so-icon></dma-icon>
                </button>
                <button dma-icon-button="outlined" dmaIconButtonLabel="Outlined">
                    <dma-icon dma-plus-so-icon></dma-icon>
                </button>
                <button dma-icon-button dmaIconButtonLabel="Standard (Default)">
                    <dma-icon dma-plus-so-icon></dma-icon>
                </button>
            </article>
        `,
    }),
};

export const StandardInteractive: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `<button [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled"><dma-icon dma-plus-so-icon /></button>`,
    }),
};

export const ToggleInteractive: Story = {
    render: (args: DmaIconButtonComponent) => ({
        props: args,
        template: `
            <button toggle [dmaIconButtonLabel]="dmaIconButtonLabel" [dmaIconButtonLabelPosition]="dmaIconButtonLabelPosition" [dma-icon-button]="dmaButtonType" [disabled]="disabled">
                <dma-icon dma-star-re-icon class="dma-icon-button-unselected" />
                <dma-icon dma-star-so-icon class="dma-icon-button-selected" />
            </button>`,
    }),
};
