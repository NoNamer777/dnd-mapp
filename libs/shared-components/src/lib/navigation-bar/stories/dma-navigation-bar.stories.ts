import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DmaIconComponent } from '../../icons';
import { DmaNavigationBarComponent } from '../dma-navigation-bar.component';
import { DmaNavigationBarModule } from '../dma-navigation-bar.module';

type Story = StoryObj<DmaNavigationBarComponent>;

const routes: Routes = [
    {
        path: '',
        component: DmaNavigationBarComponent,
    },
    {
        path: 'spells',
        redirectTo: '',
    },
    {
        path: 'characters',
        redirectTo: '',
    },
    {
        path: 'knowledge',
        redirectTo: '',
    },
];

const meta: Meta<DmaNavigationBarComponent> = {
    title: 'DmaNavigationBar',
    component: DmaNavigationBarComponent,
    decorators: [
        applicationConfig({ providers: [importProvidersFrom(RouterTestingModule.withRoutes(routes))] }),
        moduleMetadata({ imports: [DmaNavigationBarModule, DmaIconComponent] }),
    ],
};

export default meta;

export const Common: Story = {
    render: () => ({
        template: `
            <footer dma-navigation-bar>
                <dma-navigation-bar-button path="/characters">
                    <dma-icon icon="users"></dma-icon>
                    My Characters
                </dma-navigation-bar-button>            
                <dma-navigation-bar-button path="/spells">
                    <dma-icon icon="wand-sparkles"></dma-icon>
                    Spells
                </dma-navigation-bar-button>            
                <dma-navigation-bar-button path="/knowledge">
                    <dma-icon icon="book"></dma-icon>
                    Rules
                </dma-navigation-bar-button>            
                <dma-navigation-bar-button>
                    <dma-icon icon="bars"></dma-icon>
                    More
                </dma-navigation-bar-button>            
            </footer>
        `,
    }),
};
