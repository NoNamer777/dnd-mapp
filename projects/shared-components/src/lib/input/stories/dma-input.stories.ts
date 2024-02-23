import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { applicationConfig, ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconsModule } from '../../icons';
import { DmaInputComponent } from '../dma-input.component';

type Story = StoryObj<DmaInputComponent>;

const meta: Meta<DmaInputComponent> = {
    title: 'DmaInput',
    component: DmaInputComponent,
    decorators: [
        applicationConfig({ providers: [provideAnimationsAsync()] }),
        moduleMetadata({ imports: [DmaInputComponent, DmaIconsModule] }),
    ],
    args: {
        label: 'Label text',
        supportingText: 'Supporting text',
        disabled: false,
        readonly: false,
        value: '',
        invalid: false,
    } as Partial<DmaInputComponent>,
    argTypes: {
        value: {
            defaultValue: {
                summary: undefined,
            },
            description: 'The value of the input field.',
        },
        label: {
            defaultValue: {
                summary: undefined,
            },
            description:
                'The label of the input field. This is also shown as placeholder while the input has no actual value.',
        },
        supportingText: {
            defaultValue: {
                summary: undefined,
            },
            description: 'Text gives extra hints about the input fields.',
        },
        disabled: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines whether the input is enabled.',
        },
        readonly: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: `Determines whether it is allowed to change the input field's current value.`,
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
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [value]="value"
                    [label]="label"
                    [supportingText]="supportingText"
                    [class.ng-invalid]="invalid"
                ></dma-input>
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
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [value]="value"
                    [class.ng-invalid]="invalid"
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
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [value]="value"
                    [class.ng-invalid]="invalid"
                >
                    <dma-icon icon="microphone" class="trailing-icon"></dma-icon>                
                </dma-input>
            </article>        
        `,
    }),
};
