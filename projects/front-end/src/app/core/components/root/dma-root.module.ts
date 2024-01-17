import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { appRoutes } from '../../app.routes';
import { ConfigService } from '../../services/config.service';
import { DmaThemeModule } from '../../theming';
import { DmaCenterModule } from '../center';
import { DmaHeaderModule } from '../header';
import { DmaRootComponent } from './dma-root.component';

const initializeConfigServiceProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    deps: [ConfigService],
    useFactory: (configService: ConfigService) => async () => await firstValueFrom(configService.initialize()),
    multi: true,
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        DmaHeaderModule,
        DmaCenterModule,
        DmaThemeModule,
    ],
    declarations: [DmaRootComponent],
    providers: [initializeConfigServiceProvider],
    exports: [DmaRootComponent],
})
export class DmaRootModule {}
