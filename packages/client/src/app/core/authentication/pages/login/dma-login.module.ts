import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DmaLoginPage } from './dma-login.page';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    declarations: [DmaLoginPage],
    exports: [DmaLoginPage],
})
export class DmaLoginModule {}
