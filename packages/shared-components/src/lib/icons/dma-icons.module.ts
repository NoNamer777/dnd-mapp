import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaPlusIconComponent } from './plus/dma-plus-icon.component';
import { DmaStarIconComponent } from './star/dma-star-icon.component';

const icons = [DmaPlusIconComponent, DmaStarIconComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...icons],
    exports: [...icons],
})
export class DmaIconsModule {}
