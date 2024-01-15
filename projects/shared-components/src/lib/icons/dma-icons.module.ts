import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaStarReIconComponent } from './regular';
import { DmaPlusSoIconComponent, DmaStarSoIconComponent } from './solid';

const icons = [DmaPlusSoIconComponent, DmaStarSoIconComponent, DmaStarReIconComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...icons],
    exports: [...icons],
})
export class DmaIconsModule {}
