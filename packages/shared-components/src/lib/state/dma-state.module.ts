import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStateComponent } from './dma-state.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DmaStateComponent],
    exports: [DmaStateComponent],
})
export class DmaStateModule {}
