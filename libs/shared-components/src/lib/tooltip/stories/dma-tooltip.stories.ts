import { CommonModule } from '@angular/common';
import { StoryObj, moduleMetadata } from '@storybook/angular';
import { DmaButtonComponent } from '../../button';
import { DmaTooltipDirective } from '../dma-tooltip.directive';
import { DmaTooltipModule } from '../dma-tooltip.module';

export default {
    title: 'DmaTooltip',
    decorators: [moduleMetadata({ imports: [CommonModule, DmaTooltipModule, DmaButtonComponent] })],
    argTypes: {
        tooltipText: {
            control: 'text',
            type: {
                name: 'text',
                required: true,
            },
            description: 'The text that will be rendered inside the tooltip.',
        },
        position: {
            control: 'select',
            options: ['above', 'below', 'before', 'after'],
            defaultValue: {
                summary: 'above',
            },
            description: 'Determines the position of the Tooltip relative to the element to which it is attached.',
        },
    },
};

export const Common: StoryObj<DmaTooltipDirective> = {
    render: () => ({
        template: `<button dma-button="filled" dmaTooltip="My tooltip" dmaTooltipPosition="above">Button</button>`,
    }),
};

export const PlainTooltip: StoryObj<DmaTooltipDirective> = {
    args: {
        tooltipText: 'My Tooltip',
        position: 'above',
    },
    render: (args) => ({
        props: args,
        template: `<button dma-button="filled" [dmaTooltip]="tooltipText" [dmaTooltipPosition]="position">Button</button>`,
        userDefinedTemplate: true,
        styles: ['button { margin: 1em 4em; }'],
    }),
};
