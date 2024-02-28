import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ArgTypes, Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DmaIconComponent } from '../../icons';
import { DmaInputComponent } from '../dma-input.component';
import { DmaInputTypes } from '../dma-input.models';

type Story = StoryObj<DmaInputComponent>;

const meta: Meta<DmaInputComponent> = {
    title: 'DmaInput',
    component: DmaInputComponent,
    decorators: [
        applicationConfig({ providers: [provideAnimationsAsync()] }),
        moduleMetadata({ imports: [DmaInputComponent, DmaIconComponent] }),
    ],
    args: {
        inputType: 'text',
        forLabel: 'common-input-field',
        label: 'Label text',
        supportingText: 'Supporting text',
        errorMessage: '',
        disabled: false,
        readonly: false,
        value: '',
        size: 1,
    } as Partial<DmaInputComponent>,
    argTypes: {
        inputType: {
            control: 'select',
            options: Object.values(DmaInputTypes),
            defaultValue: { summary: 'text' },
            type: { name: 'string', required: true },
            description: 'Determines the type of input field',
        },
        forLabel: {
            defaultValue: { summary: undefined },
            type: { name: 'string', required: true },
            description: 'Sets the `for` attribute on the floating label as well as the `id` of the input field.',
        },
        label: {
            defaultValue: { summary: undefined },
            description:
                'The label of the input field. This is also shown as placeholder while the input has no actual value.',
        },
        supportingText: {
            defaultValue: { summary: undefined },
            description: 'Text gives extra hints about the input fields.',
        },
        errorMessage: {
            defaultValue: { summary: undefined },
            description: 'Message shown when the input field is in error state indicating what the problem is.',
        },
        disabled: {
            control: 'boolean',
            defaultValue: { summary: false },
            description: 'Determines whether the input is enabled.',
        },
        readonly: {
            control: 'boolean',
            defaultValue: { summary: false },
            description: `Determines whether it is allowed to change the input field's current value.`,
        },
        value: {
            defaultValue: { summary: undefined },
            description: 'The value of the input field.',
        },
        size: {
            control: { type: 'number', min: 1 },
            defaultValue: { summary: 1 },
            description: `The number of characters will be shown (at a minimum).`,
        },
    } as Partial<ArgTypes<DmaInputComponent>>,
};

export default meta;

export const Common: Story = {
    render: (args) => ({
        props: args,
        template: `
            <article>
                <dma-input
                    [inputType]="inputType"
                    [size]="size"
                    [forLabel]="forLabel"
                    [label]="label"
                    [value]="value"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [supportingText]="supportingText"
                    [errorMessage]="errorMessage"
                />
            </article>        
        `,
    }),
};

export const ExternalLabel: Story = {
    render: () => ({
        template: `
            <article>
                <label for="external-label-input-field">Label text</label>
                <dma-input inputType="text" forLabel="external-label-input-field" />
            </article>
        `,
    }),
};

export const LeadingIcon: Story = {
    render: () => ({
        template: `
            <article>
                <dma-input
                    inputType="text"
                    forLabel="leading-icon-input-field"
                    label="Label text"
                    supportingText="Supporting text"
                >
                    <dma-icon icon="magnifying-glass" class="leading-icon" />                
                </dma-input>
            </article>        
        `,
    }),
};

export const TrailingIcon: Story = {
    render: () => ({
        template: `
            <article>
                <dma-input
                    inputType="text"
                    forLabel="trailing-icon-input-field"
                    label="Label text"
                    supportingText="Supporting text"
                >
                    <dma-icon icon="microphone" class="trailing-icon" />                
                </dma-input>
            </article>        
        `,
    }),
};
