import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaTooltipComponent } from './dma-tooltip.component';
import { DmaTooltipDirective } from './dma-tooltip.directive';

export const TOOLTIP_DIRECTIVE = [DmaTooltipDirective] as const;

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [DmaTooltipComponent],
    exports: [DmaTooltipComponent],
})
export class DmaTooltipModule {}
