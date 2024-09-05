import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmaLoginPage } from './pages/login';
import { DmaSignUpPage } from './pages/sign-up';

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
    imports: [RouterModule.forChild(authenticationRoutes)],
})
export class DmaAuthenticationModule {}
