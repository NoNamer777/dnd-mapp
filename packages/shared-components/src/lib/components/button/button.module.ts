import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { StateModule } from '../state';

@NgModule({
    imports: [CommonModule, StateModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {}
