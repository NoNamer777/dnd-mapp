import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaIconButtonComponent } from './dma-icon-button.component';
import { DmaStateModule } from '../state';

@NgModule({
    imports: [CommonModule, DmaStateModule],
    declarations: [DmaIconButtonComponent],
    exports: [DmaIconButtonComponent],
})
export class DmaIconButtonModule {}
