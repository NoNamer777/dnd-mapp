import { Routes } from '@angular/router';
import { DmaCreaturesOverviewPage, DmaGameRulesPage, DmaSpellsOverviewPage } from '../pages';

export const compendiumRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rules',
    },
    {
        path: 'creatures',
        component: DmaCreaturesOverviewPage,
    },
    {
        path: 'rules',
        component: DmaGameRulesPage,
    },
    {
        path: 'spells',
        component: DmaSpellsOverviewPage,
    },
];
