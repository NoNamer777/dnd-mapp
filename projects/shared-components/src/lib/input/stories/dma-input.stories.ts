import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaInputComponent } from '../dma-input.component';

type Story = StoryObj<DmaInputComponent>;

const meta: Meta<DmaInputComponent> = {
    title: 'DmaInput',
    component: DmaInputComponent,
    decorators: [moduleMetadata({ imports: [DmaInputComponent] })],
    args: {
        value: 'Hello',
        disabled: false,
    },
    argTypes: {
        value: {
            defaultValue: {
                summary: undefined,
            },
            description: 'The value of the input field',
        },
        disabled: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines whether the input is enabled',
        },
        readOnly: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: `Determines whether allows changing its current value`,
        },
    } as Partial<ArgTypes<DmaInputComponent & HTMLInputElement>>,
};

export default meta;

export const Common: Story = {
    render: (args) => ({
        props: args,
        template: `
            <article>
                <input type="text" dma-input [disabled]="disabled" [readOnly]="readOnly" [value]="value">
            </article>        
        `,
    }),
};
