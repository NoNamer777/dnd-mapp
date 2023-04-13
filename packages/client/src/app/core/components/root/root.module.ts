import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { HeaderModule } from '../header';
import { CenterModule } from '../center';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        HeaderModule,
        CenterModule,
    ],
    declarations: [RootComponent],
    exports: [RootComponent],
})
export class RootModule {}
