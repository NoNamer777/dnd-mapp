import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconComponent } from '../../icons';
import { DmaInputComponent } from '../dma-input.component';

type Story = StoryObj<DmaInputComponent>;

const meta: Meta<DmaInputComponent> = {
    title: 'DmaInput',
    component: DmaInputComponent,
    decorators: [
        applicationConfig({ providers: [provideAnimationsAsync()] }),
        moduleMetadata({ imports: [DmaInputComponent, DmaIconComponent] }),
    ],
    args: {
        label: 'Label text',
        supportingText: 'Supporting text',
        errorMessage: '',
        disabled: false,
        readonly: false,
        value: '',
        invalid: false,
        size: 1,
    } as Partial<DmaInputComponent>,
    argTypes: {
        value: {
            defaultValue: { summary: undefined },
            description: 'The value of the input field.',
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
        invalid: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines whether the inputted value is invalid.',
        },
        readonly: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: `Determines whether it is allowed to change the input field's current value.`,
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
                    inputType="text" 
                    [size]="size"
                    [label]="label"
                    [value]="value"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [supportingText]="supportingText"
                    [errorMessage]="errorMessage"
                    [invalid]="invalid"
                />
            </article>        
        `,
    }),
};

export const LeadingIcon: Story = {
    render: (args) => ({
        props: args,
        template: `
            <article>
                <dma-input
                    inputType="text"
                    label="Label text" 
                    supportingText="Supporting text"
                    errorMessage="Error message"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [value]="value"
                    [invalid]="invalid"
                >
                    <dma-icon icon="magnifying-glass" class="leading-icon"></dma-icon>                
                </dma-input>
            </article>        
        `,
    }),
};

export const TrailingIcon: Story = {
    render: (args) => ({
        props: args,
        template: `
            <article>
                <dma-input
                    inputType="text"
                    label="Label text" 
                    supportingText="Supporting text"
                    errorMessage="Error message"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [value]="value"
                    [invalid]="invalid"
                >
                    <dma-icon icon="microphone" class="trailing-icon"></dma-icon>                
                </dma-input>
            </article>        
        `,
    }),
};
