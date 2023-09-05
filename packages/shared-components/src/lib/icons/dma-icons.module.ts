import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaPlusIconComponent } from './plus/dma-plus-icon.component';

const icons = [DmaPlusIconComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...icons],
    exports: [...icons],
})
export class DmaIconsModule {}
