import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, finalize, takeUntil } from 'rxjs';
import { swipeInOutAnimation } from '../../animations';
import { DmaAuthenticationService } from '../../services';

const STATUS_CODE_BAD_REQUEST = 400;

@Component({
    selector: 'dma-signup',
    templateUrl: './dma-sign-up.page.html',
    styleUrls: ['./dma-sign-up.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [swipeInOutAnimation],
})
export class DmaSignUpPage implements OnDestroy {
    error$ = new Subject<string | null>();

    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        emailConfirm: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        password: new FormControl<string | null>(null, [Validators.required]),
        passwordConfirm: new FormControl<string | null>(null, [Validators.required]),
    });

    loading$ = new BehaviorSubject(false);

    stage = 1;

    success$ = new Subject<string | null>();

    private destroy$ = new Subject<void>();

    constructor(private readonly authenticationService: DmaAuthenticationService) {}

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

    getControlErrors(controlName: string) {
        return this.form.get(controlName)!.errors;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onGoToNextStage() {
        if (this.form.invalid) return;
        this.stage = 2;
    }

    onGoToPreviousStage() {
        this.stage = 1;
    }

    onSignUpError(error: HttpErrorResponse) {
        let message = 'Something unexpected has happened. Please, try again later';
        let formError: Record<string, unknown> = { unexpectedError: true };

        if (error.status === STATUS_CODE_BAD_REQUEST) {
            message = 'The username is currently unavailable. Please, use a different one';
            formError = { usernameUnavailable: message };
            this.stage = 1;

            this.form.get('username')!.setErrors(formError);
        } else {
            this.error$.next(message);
            this.form.setErrors(formError);
        }
    }

    onSignUpSuccess() {
        this.success$.next(`You've successfully registered an account. You can now go on and log in`);
    }

    onSubmit() {
        const { username, email, password } = this.form.value;

        this.loading$.next(true);

        this.authenticationService
            .signUp({ username: username!, password: password!, emailAddress: email! })
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => this.loading$.next(false))
            )
            .subscribe({
                next: () => this.onSignUpSuccess(),
                error: (error: HttpErrorResponse) => this.onSignUpError(error),
            });
    }

    private getFormControl(controlName: string) {
        return this.form.get(controlName)!;
    }
}
