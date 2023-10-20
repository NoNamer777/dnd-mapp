import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { swipeInOutAnimation } from '../../animations';

@Component({
    selector: 'dma-signup',
    templateUrl: './dma-signup.page.html',
    styleUrls: ['./dma-signup.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [swipeInOutAnimation],
})
export class DmaSignupPage {
    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        emailConfirm: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        password: new FormControl<string | null>(null, [Validators.required]),
        passwordConfirm: new FormControl<string | null>(null, [Validators.required]),
    });

    stage = 1;

    get isFormInvalid() {
        return this.form.invalid;
    }

    get isFirstStageCompleted() {
        return (
            this.getFormControl('username').valid &&
            this.getFormControl('email').valid &&
            this.getFormControl('emailConfirm').valid
        );
    }

    onGoToNextStage() {
        this.stage = 2;
    }

    onGoToPreviousStage() {
        this.stage = 1;
    }

    onSubmit() {
        console.warn('Form submitted', this.form.value);
    }

    private getFormControl(controlName: string) {
        return this.form.get(controlName)!;
    }
}
