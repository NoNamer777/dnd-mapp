import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaTooltipComponent } from './dma-tooltip.component';
import { DmaTooltipDirective } from './dma-tooltip.directive';

const TOOLTIP_DIRECTIVE = [DmaTooltipDirective] as const;

@NgModule({
    imports: [CommonModule, OverlayModule, ...TOOLTIP_DIRECTIVE],
    declarations: [DmaTooltipComponent],
    exports: [DmaTooltipComponent, ...TOOLTIP_DIRECTIVE],
})
export class DmaTooltipModule {}
