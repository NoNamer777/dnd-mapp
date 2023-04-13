import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CenterComponent],
    exports: [CenterComponent],
})
export class CenterModule {}
