import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CenterComponent } from './center.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [CenterComponent],
    exports: [CenterComponent],
})
export class CenterModule {}
