import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStateModule } from '../state';
import { DmaTooltipModule, TOOLTIP_DIRECTIVE } from '../tooltip';
import { DmaIconButtonComponent } from './dma-icon-button.component';

@NgModule({
    imports: [CommonModule, DmaStateModule, ...TOOLTIP_DIRECTIVE, DmaTooltipModule],
    declarations: [DmaIconButtonComponent],
    exports: [DmaIconButtonComponent],
})
export class DmaIconButtonModule {}
