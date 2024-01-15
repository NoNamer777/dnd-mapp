import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DmaIconsModule } from '../../../../shared';
import { DmaLoginPage } from './dma-login.page';

@NgModule({
    imports: [CommonModule, DmaIconsModule, ReactiveFormsModule, RouterModule],
    declarations: [DmaLoginPage],
    exports: [DmaLoginPage],
})
export class DmaLoginModule {}
