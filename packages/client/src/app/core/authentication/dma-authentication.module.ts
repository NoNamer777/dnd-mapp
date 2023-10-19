import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaLoginModule, DmaLoginPage } from './pages/login';

const authenticationRoutes: Routes = [
    {
        path: 'login',
        component: DmaLoginPage,
    },
    {
        path: '',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [DmaLoginModule, RouterModule.forChild(authenticationRoutes)],
})
export class DmaAuthenticationModule {}
