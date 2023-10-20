import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaLoginModule, DmaLoginPage } from './pages/login';
import { DmaSignupModule, DmaSignupPage } from './pages/signup';

const authenticationRoutes: Routes = [
    {
        path: 'login',
        component: DmaLoginPage,
    },
    {
        path: 'signup',
        component: DmaSignupPage,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [DmaLoginModule, DmaSignupModule, RouterModule.forChild(authenticationRoutes)],
})
export class DmaAuthenticationModule {}
