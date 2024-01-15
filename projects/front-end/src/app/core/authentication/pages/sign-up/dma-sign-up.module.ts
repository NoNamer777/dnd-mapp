import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DmaIconsModule, PasswordFromControlModule } from '../../../../shared';
import { DmaSignUpPage } from './dma-sign-up.page';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule, DmaIconsModule, PasswordFromControlModule],
    declarations: [DmaSignUpPage],
    exports: [DmaSignUpPage],
})
export class DmaSignUpModule {}
