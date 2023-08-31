import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaButtonComponent } from './dma-button.component';
import { DmaStateModule } from '../state';

@NgModule({
    imports: [CommonModule, DmaStateModule],
    declarations: [DmaButtonComponent],
    exports: [DmaButtonComponent],
})
export class DmaButtonModule {}
