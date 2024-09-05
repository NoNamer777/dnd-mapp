import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaColorsComponent } from './dma-colors.component';

type Story = StoryObj<DmaColorsComponent>;

const meta: Meta<DmaColorsComponent> = {
    title: 'DmaColors',
    decorators: [moduleMetadata({ imports: [DmaColorsComponent] })],
};

export default meta;

export const Common: Story = {
    render: () => ({
        template: `
            <article>
                <dma-colors></dma-colors>
            </article>
        `,
    }),
};
