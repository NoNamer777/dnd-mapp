import { importProvidersFrom } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconsModule } from '../../icons';
import { DmaNavigationBarButtonComponent } from '../button';
import { DmaNavigationBarModule } from '../dma-navigation-bar.module';

type Story = StoryObj<DmaNavigationBarButtonComponent>;

const meta: Meta<DmaNavigationBarButtonComponent> = {
    component: DmaNavigationBarButtonComponent,
    decorators: [
        applicationConfig({ providers: [importProvidersFrom(RouterTestingModule.withRoutes([{ path: 'page-a' }]))] }),
        moduleMetadata({ imports: [DmaNavigationBarModule, DmaIconsModule] }),
    ],
    args: {
        active: false,
        path: '/page-a',
    },
    argTypes: {
        active: {
            controls: 'boolean',
            defaultValue: {
                summary: false,
            },
            description: 'Determines whether the button is marked as currently active',
        },
        path: {
            description: 'The route that is navigated to when the button is clicked',
        },
    },
};

export default meta;

export const Common: Story = {
    render: (args) => ({
        props: args,
        template: `
            <dma-navigation-bar-button [path]="path" [active]="active">
                <dma-icon icon="star"></dma-icon>
                My label            
            </dma-navigation-bar-button>
        `,
    }),
};
