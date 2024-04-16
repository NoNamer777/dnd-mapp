import { Routes } from '@angular/router';
import { DmaCharacterBuilderPage, DmaCharacterOverviewPage } from '../pages';

export const characterRoutes: Routes = [
    {
        path: '',
        component: DmaCharacterOverviewPage,
    },
    {
        path: 'new',
        component: DmaCharacterBuilderPage,
    },
];
