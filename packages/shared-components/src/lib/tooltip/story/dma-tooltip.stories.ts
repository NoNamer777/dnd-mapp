import { moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaTooltipModule } from '../dma-tooltip.module';
import { DmaButtonModule } from '../../button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'plain-dma-tooltip-story',
    templateUrl: './dma-tooltip.stories.html',
    styleUrls: ['./dma-tooltip.stories.scss'],
})
class PlainDmaTooltipStoryComponent {
    @Input() text: string;
}

@NgModule({
    imports: [CommonModule, DmaTooltipModule, DmaButtonModule],
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
        text: 'My Tooltip',
    },
    render: (args) => ({
        props: args,
        template: `<plain-dma-tooltip-story [text]="text"></plain-dma-tooltip-story>`,
        userDefinedTemplate: true,
    }),
};
