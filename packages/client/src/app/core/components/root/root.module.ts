import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { CenterModule } from '../center';
import { HeaderModule } from '../header';
import { RootComponent } from './root.component';

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
