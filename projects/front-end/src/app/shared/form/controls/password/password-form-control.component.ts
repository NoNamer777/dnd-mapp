import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, FactoryProvider, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DmaIconsModule } from '../../../icons';

type PasswordIconProp = 'eye' | 'eye-slash';

type PasswordInputType = 'password' | 'text';

const controlContainerProvider: FactoryProvider = {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Component({
    selector: 'dma-password-form-control',
    templateUrl: './password-form-control.component.html',
    styleUrls: ['./password-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [controlContainerProvider],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DmaIconsModule],
})
export class PasswordFormControlComponent implements OnInit {
    @Input() label: string;
    @Input() inputId: string;
    @Input() inputFormControlName: string;
    @Input() autocomplete: string;

    protected icon: PasswordIconProp = 'eye';

    protected inputType: PasswordInputType = 'password';

    private toggled = false;

    constructor(private controlContainer: ControlContainer) {}

    private get parentFormGroup() {
        return this.controlContainer.control as FormGroup;
    }

    ngOnInit() {
        this.parentFormGroup.addControl(
            this.inputFormControlName,
            new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)])
        );
    }

    onTogglePasswordVisibility() {
        this.toggled = !this.toggled;
        this.icon = this.toggled ? 'eye-slash' : 'eye';
        this.inputType = this.toggled ? 'text' : 'password';
    }
}
