import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaSelectComponent } from '../dma-select.component';
import { DmaSelectModule } from '../dma-select.module';

type Story = StoryObj<DmaSelectComponent>;

const meta: Meta<DmaSelectComponent> = {
    title: 'DmaSelect',
    component: DmaSelectComponent,
    args: {
        label: 'Label text',
        disabled: false,
    },
    argTypes: {
        forLabel: {
            defaultValue: { summary: undefined },
            type: { name: 'string', required: true },
            description: 'Sets the `for` attribute on the floating label as well as the `id` of the select.',
        },
        label: {
            defaultValue: { summary: undefined },
            description:
                'The label of the select. This is also shown as placeholder while the select has no actual value.',
        },
        disabled: {
            defaultValue: { summary: false },
            description: 'Whether the select element is active',
        },
    },
    decorators: [
        applicationConfig({ providers: [provideAnimationsAsync()] }),
        moduleMetadata({ imports: [DmaSelectModule] }),
    ],
};

export default meta;

export const Common: Story = {
    render: (args) => ({
        props: args,
        template: `
            <dma-select forLabel="common-select" [label]="label" [disabled]="disabled">
                <dma-option label="Option 1" [value]="1" />
                <dma-option label="Option 2" [value]="2" />
                <dma-option label="Option 3" [value]="3" disabled />
                <dma-option label="Option 4" [value]="4" />
            </dma-select>
        `,
    }),
};
