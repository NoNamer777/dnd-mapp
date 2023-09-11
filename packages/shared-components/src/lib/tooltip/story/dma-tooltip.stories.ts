import { moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaTooltipModule, TOOLTIP_DIRECTIVE } from '../dma-tooltip.module';
import { DmaButtonModule } from '../../button';
import { DmaTooltipPosition } from '../dma-tooltip.directive';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'plain-dma-tooltip-story',
    templateUrl: './dma-tooltip.stories.html',
    styleUrls: ['./dma-tooltip.stories.scss'],
})
class PlainDmaTooltipStoryComponent {
    @Input() tooltipText: string;
    @Input() tooltipPosition: DmaTooltipPosition;
}

@NgModule({
    imports: [CommonModule, DmaTooltipModule, DmaButtonModule, ...TOOLTIP_DIRECTIVE],
    declarations: [PlainDmaTooltipStoryComponent],
    exports: [PlainDmaTooltipStoryComponent],
})
class StoryModule {}

export default {
    title: 'Dma-tooltip',
    decorators: [moduleMetadata({ imports: [StoryModule] })],
};

export const PlainTooltip: StoryObj<PlainDmaTooltipStoryComponent> = {
    args: {
        tooltipText: 'My Tooltip',
        tooltipPosition: 'above',
    },
    argTypes: {
        tooltipPosition: {
            control: 'select',
            options: ['above', 'below', 'before', 'after'],
        },
    },
    render: (args) => ({
        props: args,
        template: `<plain-dma-tooltip-story [tooltipText]="tooltipText" [tooltipPosition]="tooltipPosition" />`,
        userDefinedTemplate: true,
    }),
};
