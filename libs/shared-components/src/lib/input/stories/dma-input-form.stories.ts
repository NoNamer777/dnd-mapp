import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DmaIconComponent } from '../../icons';
import { DmaInputComponent } from '../dma-input.component';

@Component({
    selector: 'dma-form',
    template: `
        <form [formGroup]="form">
            <dma-input formControlName="inputField" label="Label text*" supportingText="*required" />
        </form>
        <br />
        <hr />
        <p>Form is valid: {{ form.valid }}</p>
        <p>Control is valid: {{ form.controls.inputField.valid }}</p>
        <p>Control is touched: {{ form.controls.inputField.touched }}</p>
        <p>Control is dirty: {{ form.controls.inputField.dirty }}</p>
    `,
    standalone: true,
    imports: [CommonModule, DmaInputComponent, ReactiveFormsModule],
})
class FormComponent {
    protected form = new FormGroup({
        inputField: new FormControl<string>(null, [Validators.required]),
    });
}

type Story = StoryObj<FormComponent>;

const meta: Meta<FormComponent> = {
    title: 'DmaInput - Angular Forms Support',
    component: FormComponent,
    decorators: [
        applicationConfig({ providers: [provideAnimationsAsync()] }),
        moduleMetadata({ imports: [DmaIconComponent, FormComponent] }),
    ],
};

export default meta;

export const FormsCompatible: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: { imports: [FormComponent] },
        template: `
            <article>
                <dma-form />
            </article>        
        `,
    }),
};
