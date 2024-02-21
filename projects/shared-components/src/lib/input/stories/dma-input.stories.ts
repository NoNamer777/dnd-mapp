import { ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaInputComponent } from '../dma-input.component';

type Story = StoryObj<DmaInputComponent>;

const meta: Meta<DmaInputComponent> = {
    title: 'DmaInput',
    component: DmaInputComponent,
    decorators: [moduleMetadata({ imports: [DmaInputComponent] })],
    args: {
        label: 'Label text',
        disabled: false,
        readonly: false,
        invalid: false,
        value: '',
    } as Partial<DmaInputComponent>,
    argTypes: {
        value: {
            defaultValue: {
                summary: undefined,
            },
            description: 'The value of the input field',
        },
        label: {
            defaultValue: {
                summary: undefined,
            },
            description:
                'The label of the input field. This is also shown as placeholder while the input has no actual value',
        },
        disabled: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines whether the input is enabled',
        },
        readonly: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: `Determines whether allows changing its current value`,
        },
    } as Partial<ArgTypes<DmaInputComponent>>,
};

export default meta;

export const Common: Story = {
    render: (args) => ({
        props: args,
        template: `
            <article>
                <dma-input inputType="text"  [disabled]="disabled" [readonly]="readonly" [value]="value" [label]="label"></dma-input>
            </article>        
        `,
    }),
};
