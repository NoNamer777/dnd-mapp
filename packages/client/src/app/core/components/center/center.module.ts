import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CenterComponent } from './center.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CenterComponent],
    exports: [CenterComponent],
})
export class CenterModule {}
