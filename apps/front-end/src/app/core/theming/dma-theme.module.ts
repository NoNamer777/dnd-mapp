import { NgModule } from '@angular/core';
import { DmaThemeDirective } from './dma-theme.directive';

@NgModule({
    imports: [DmaThemeDirective],
    exports: [DmaThemeDirective],
})
export class DmaThemeModule {}
