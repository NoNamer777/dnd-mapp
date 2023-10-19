import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DmaCenterComponent } from './dma-center.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [DmaCenterComponent],
    exports: [DmaCenterComponent],
})
export class DmaCenterModule {}
