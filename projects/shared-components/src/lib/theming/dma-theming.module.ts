import { NgModule } from '@angular/core';
import { DmaThemeDirective } from './diretives/dma-theme/dma-theme.directive';

@NgModule({
    declarations: [DmaThemeDirective],
    exports: [DmaThemeDirective],
})
export class DmaThemingModule {}
