import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaTooltipDirective } from './dma-tooltip.directive';
import { DmaTooltipComponent } from './dma-tooltip.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DmaTooltipComponent, DmaTooltipDirective],
    exports: [DmaTooltipComponent, DmaTooltipDirective],
})
export class DmaTooltipModule {}
