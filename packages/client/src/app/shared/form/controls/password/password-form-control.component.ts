import { ChangeDetectionStrategy, Component, FactoryProvider, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';

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
})
export class PasswordFormControlComponent implements OnInit, OnDestroy {
    @Input() label: string;
    @Input() inputId: string;
    @Input() inputFormControlName: string;

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

    ngOnDestroy() {
        this.parentFormGroup.removeControl(this.inputFormControlName);
    }

    onTogglePasswordVisibility() {
        this.toggled = !this.toggled;
        this.icon = this.toggled ? 'eye-slash' : 'eye';
        this.inputType = this.toggled ? 'text' : 'password';
    }
}
