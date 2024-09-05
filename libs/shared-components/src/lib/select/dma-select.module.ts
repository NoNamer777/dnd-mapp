import { NgModule } from '@angular/core';
import { DmaSelectComponent } from './dma-select.component';
import { DmaOptionComponent } from './option/dma-option.component';

@NgModule({
    imports: [DmaSelectComponent, DmaOptionComponent],
    exports: [DmaSelectComponent, DmaOptionComponent],
})
export class DmaSelectModule {}
