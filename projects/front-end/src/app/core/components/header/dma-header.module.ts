import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DmaIconsModule } from '../../../shared';
import { DmaHeaderComponent } from './dma-header.component';

@NgModule({
    imports: [CommonModule, RouterModule, DmaIconsModule],
    declarations: [DmaHeaderComponent],
    exports: [DmaHeaderComponent],
})
export class DmaHeaderModule {}
