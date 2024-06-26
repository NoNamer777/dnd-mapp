import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, finalize, takeUntil } from 'rxjs';
import { DmaIconsModule, PasswordFormControlComponent } from '../../../../shared';
import { swipeInOutAnimation } from '../../animations';
import { DmaAuthenticationService } from '../../services';
import { emailValidator, passwordValidator } from './validators';

const STATUS_CODE_BAD_REQUEST = 400;

@Component({
    selector: 'dma-signup',
    templateUrl: './dma-sign-up.page.html',
    styleUrls: ['./dma-sign-up.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [swipeInOutAnimation],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DmaIconsModule,
        PasswordFormControlComponent,
    ],
})
export class DmaSignUpPage implements AfterViewInit, OnDestroy {
    error$ = new Subject<string | null>();

    form = new FormGroup(
        {
            username: new FormControl<string | null>(null, [Validators.required]),
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
            emailConfirm: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        },
        {
            validators: [emailValidator],
        }
    );

    loading$ = new BehaviorSubject(false);

    stage = 1;

    success$ = new Subject<string | null>();

    @ViewChild(FormGroupDirective) private formDirective: FormGroupDirective;

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

    doesControlHasErrors(controlName: string, errorName: string) {
        return this.form.get(controlName)!.hasError(errorName);
    }

    getControlError(controlName: string, errorName: string) {
        return this.form.get(controlName)!.getError(errorName);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit() {
        this.form.addValidators(passwordValidator);
    }

    onGoToNextStage() {
        if (!this.isFirstStageCompleted) return;
        this.stage = 2;
    }

    onGoToPreviousStage() {
        this.stage = 1;
    }

    onSignUpError(error: HttpErrorResponse) {
        let message = 'Something unexpected has happened. Please, try again later';
        let formError: Record<string, unknown> = { unexpectedError: true };

        if (error.status === STATUS_CODE_BAD_REQUEST) {
            if (typeof error.error.message === 'string' && error.error.message.includes('username')) {
                message = 'The username is currently unavailable. Please, use a different one';
                formError = { usernameUnavailable: message };
                this.onGoToPreviousStage();

                this.form.get('username')!.setErrors(formError);
                return;
            }
        }
        this.error$.next(message);
        this.form.setErrors(formError);
    }

    onSignUpSuccess() {
        this.formDirective.resetForm();
        this.onGoToPreviousStage();
        this.success$.next(`You've successfully registered an account. You can now go on and log in`);
    }

    onSubmit() {
        const { username, email } = this.form.value;

        this.loading$.next(true);

        this.authenticationService
            .signUp({ username: username!, password: this.form.get('password')!.value, emailAddress: email! })
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
