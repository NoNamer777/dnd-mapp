import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DmaSignupPage } from './dma-signup.page';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    declarations: [DmaSignupPage],
    exports: [DmaSignupPage],
})
export class DmaSignupModule {}
