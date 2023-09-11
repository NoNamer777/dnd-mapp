import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaIconButtonComponent } from './dma-icon-button.component';
import { DmaStateModule } from '../state';
import { DmaTooltipModule, TOOLTIP_DIRECTIVE } from '../tooltip';

@NgModule({
    imports: [CommonModule, DmaStateModule, ...TOOLTIP_DIRECTIVE, DmaTooltipModule],
    declarations: [DmaIconButtonComponent],
    exports: [DmaIconButtonComponent],
})
export class DmaIconButtonModule {}
