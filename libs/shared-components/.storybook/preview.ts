import { DmaThemeDirective } from '@dnd-mapp/shared-components';
import { componentWrapperDecorator, moduleMetadata, Preview } from '@storybook/angular';

export default {
    parameters: {
        controls: {
            expanded: true,
        },
    },
    decorators: [
        moduleMetadata({
            imports: [DmaThemeDirective],
        }),
        componentWrapperDecorator((story) => `<main dmaTheme><section>${story}</section></main>`),
    ],
} as Preview;
