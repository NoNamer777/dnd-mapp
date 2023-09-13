import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconsModule } from '../../icons';
import { DmaButtonComponent } from '../dma-button.component';
import { DmaButtonModule } from '../dma-button.module';

type Story = StoryObj<DmaButtonComponent>;

const meta: Meta<DmaButtonComponent> = {
    title: 'DmaButton',
    component: DmaButtonComponent,
    decorators: [moduleMetadata({ imports: [DmaButtonModule, DmaIconsModule] })],
    args: {
        disabled: false,
        dmaButtonType: 'elevated',
    } as Partial<DmaButtonComponent & HTMLButtonElement>,
    argTypes: {
        disabled: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines if the button is enabled',
        },
        dmaButtonType: {
            control: 'select',
            options: ['elevated', 'filled', 'tonal', 'outlined', 'text'],
            defaultValue: {
                summary: 'text',
            },
            description:
                'The type of button to be rendered. Which in turn ultimately determines the style of the button',
        },
    } as Partial<ArgTypes<DmaButtonComponent & HTMLButtonElement>>,
};

export default meta;

export const Common: Story = {
    render: () => ({
        template: `
            <article class="row">
                <button dma-button="filled">Filled</button>
                <button dma-button="elevated">Elevated</button>
                <button dma-button="tonal">Tonal</button>
                <button dma-button="outlined">Outlined</button>
                <button dma-button>Text (Default)</button>
            </article>
        `,
    }),
};

export const Interactive: Story = {
    render: (args: DmaButtonComponent) => ({
        props: args,
        template: `<button [dma-button]="dmaButtonType" [disabled]="disabled">Button</button>`,
    }),
};

export const InteractiveWithIcon: Story = {
    render: (args: DmaButtonComponent) => ({
        props: args,
        template: `
            <button [dma-button]="dmaButtonType" [disabled]="disabled">
                <dma-icon dma-plus-so-icon />
                Button
            </button>`,
    }),
};
