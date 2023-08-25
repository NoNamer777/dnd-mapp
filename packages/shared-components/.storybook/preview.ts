import { componentWrapperDecorator, moduleMetadata, Preview } from '@storybook/angular';
import { DmaThemingModule } from '../src/lib/theming';

export default {
    decorators: [
        moduleMetadata({
            imports: [DmaThemingModule],
        }),
        componentWrapperDecorator((story) => `<main dmaTheme><section>${story}</section></main>`),
    ],
} as Preview;
