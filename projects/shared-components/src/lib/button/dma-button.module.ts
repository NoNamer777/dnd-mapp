import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStateModule } from '../state';
import { DmaButtonComponent } from './dma-button.component';

@NgModule({
    imports: [CommonModule, DmaStateModule],
    declarations: [DmaButtonComponent],
    exports: [DmaButtonComponent],
})
export class DmaButtonModule {}
