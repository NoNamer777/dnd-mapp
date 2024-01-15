import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaLoginModule, DmaLoginPage } from './pages/login';
import { DmaSignUpModule, DmaSignUpPage } from './pages/sign-up';

const authenticationRoutes: Routes = [
    {
        path: 'login',
        component: DmaLoginPage,
    },
    {
        path: 'sign-up',
        component: DmaSignUpPage,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [DmaLoginModule, DmaSignUpModule, RouterModule.forChild(authenticationRoutes)],
})
export class DmaAuthenticationModule {}
