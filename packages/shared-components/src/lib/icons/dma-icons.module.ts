import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DmaSoStarIconComponent, DmaSoPlusIconComponent } from './solid';
import { DmaStarReIconComponent } from './regular';

const icons = [DmaSoPlusIconComponent, DmaSoStarIconComponent, DmaStarReIconComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...icons],
    exports: [...icons],
})
export class DmaIconsModule {}
