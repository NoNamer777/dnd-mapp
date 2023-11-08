import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DmaIconsModule } from '../../../icons';
import { PasswordFormControlComponent } from './password-form-control.component';

@NgModule({
    imports: [CommonModule, DmaIconsModule, ReactiveFormsModule],
    declarations: [PasswordFormControlComponent],
    exports: [PasswordFormControlComponent],
})
export class PasswordFromControlModule {}
