import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackEndError, HttpResponseStatusCodes } from '@dnd-mapp/data';
import { DmaButtonComponent, DmaIconComponent, DmaInputComponent } from '@dnd-mapp/shared-components';
import { BehaviorSubject, finalize, Subject, takeUntil } from 'rxjs';
import { NotificationService, PasswordFormControlComponent } from '../../../../shared';
import { swipeInOutAnimation } from '../../animations';
import { DmaAuthenticationService } from '../../services';
import { emailValidator, passwordValidator } from './validators';

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
        ReactiveFormsModule,
        PasswordFormControlComponent,
        DmaButtonComponent,
        DmaInputComponent,
        DmaIconComponent,
    ],
})
export class DmaSignUpPage implements OnDestroy {
    private readonly authenticationService = inject(DmaAuthenticationService);
    private readonly notificationService = inject(NotificationService);

    private readonly destroy$ = new Subject<void>();

    @ViewChild(FormGroupDirective) private readonly formDirective: FormGroupDirective;

    protected readonly loading$ = new BehaviorSubject(false);

    protected readonly form = new FormGroup(
        {
            username: new FormControl<string | null>(null, [Validators.required, Validators.min(3)]),
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
            emailConfirm: new FormControl<string | null>(null, [Validators.required]),
            password: new FormControl<string | null>(null, [Validators.required, Validators.min(8)]),
            passwordConfirm: new FormControl<string | null>(null, [Validators.required]),
        },
        {
            validators: [emailValidator, passwordValidator],
        }
    );

    protected get isFormInvalid() {
        return this.form.invalid;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected onSubmit() {
        const { username, email, password } = this.form.value;

        this.loading$.next(true);

        this.authenticationService
            .signUp({ username: username, password: password, emailAddress: email })
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => this.loading$.next(false))
            )
            .subscribe({
                next: () => this.onSignUpSuccess(),
                error: (error: BackEndError) => this.onSignUpError(error),
            });
    }

    private onSignUpSuccess() {
        this.formDirective.resetForm();

        this.notificationService.show({ title: 'Success', message: 'Sign up successful', type: 'success' });
    }

    private onSignUpError(error: BackEndError) {
        let message = 'Something unexpected has happened. Please, try again later';
        let formError: Record<string, unknown> = { unexpectedError: true };

        if (error.status === HttpResponseStatusCodes.BAD_REQUEST) {
            if (typeof error.message === 'string' && error.message.includes('username')) {
                message = 'The username is currently unavailable. Please, use a different one';
                formError = { usernameUnavailable: message };

                this.form.get('username')!.setErrors(formError);
                throw error;
            }
        }
        this.form.setErrors(formError);
        throw error;
    }
}
