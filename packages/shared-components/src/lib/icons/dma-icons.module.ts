import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStarSoIconComponent, DmaPlusSoIconComponent } from './solid';
import { DmaStarReIconComponent } from './regular';

const icons = [DmaPlusSoIconComponent, DmaStarSoIconComponent, DmaStarReIconComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...icons],
    exports: [...icons],
})
export class DmaIconsModule {}
