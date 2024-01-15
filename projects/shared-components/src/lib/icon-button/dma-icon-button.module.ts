import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStateModule } from '../state';
import { DmaTooltipModule } from '../tooltip';
import { DmaIconButtonComponent } from './dma-icon-button.component';

@NgModule({
    imports: [CommonModule, DmaStateModule, DmaTooltipModule],
    declarations: [DmaIconButtonComponent],
    exports: [DmaIconButtonComponent],
})
export class DmaIconButtonModule {}
