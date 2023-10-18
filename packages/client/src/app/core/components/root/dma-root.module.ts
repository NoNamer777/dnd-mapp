import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { DmaThemeModule } from '../../theming';
import { CenterModule } from '../center';
import { DmaHeaderModule } from '../header';
import { DmaRootComponent } from './dma-root.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        DmaHeaderModule,
        CenterModule,
        DmaThemeModule,
    ],
    declarations: [DmaRootComponent],
    exports: [DmaRootComponent],
})
export class DmaRootModule {}
