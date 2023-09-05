import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaTooltipComponent } from './dma-tooltip.component';
import { DmaTooltipDirective } from './dma-tooltip.directive';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [DmaTooltipComponent, DmaTooltipDirective],
    exports: [DmaTooltipComponent, DmaTooltipDirective],
})
export class DmaTooltipModule {}
