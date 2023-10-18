import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { CenterModule } from '../center';
import { HeaderModule } from '../header';
import { DmaRootComponent } from './dma-root.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        HeaderModule,
        CenterModule,
    ],
    declarations: [DmaRootComponent],
    exports: [DmaRootComponent],
})
export class DmaRootModule {}
