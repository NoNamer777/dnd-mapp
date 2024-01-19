import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, finalize, takeUntil } from 'rxjs';
import { DmaIconsModule } from '../../../../shared';
import { DmaAuthenticationService } from '../../services';

const INVALID_CREDENTIALS_STATUS_CODE = [400, 404];

@Component({
    selector: 'dma-login',
    templateUrl: './dma-login.page.html',
    styleUrls: ['./dma-login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, DmaIconsModule],
})
export class DmaLoginPage implements OnDestroy {
    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        password: new FormControl<string | null>(null, [Validators.required]),
    });

    loading$ = new BehaviorSubject(false);
    error$ = new BehaviorSubject<string | null>(null);
    success$ = new BehaviorSubject<string | null>(null);

    private destroy$ = new Subject<void>();

    constructor(private authenticationService: DmaAuthenticationService) {}

    get isFormInvalid() {
        return this.form.invalid;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit() {
        const { username, password } = this.form.value;

        this.loading$.next(true);
        this.error$.next(null);

        this.authenticationService
            .login(username!, password!)
            .pipe(
                finalize(() => this.loading$.next(false)),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: () => this.onLoginSuccess(),
                error: (error: HttpErrorResponse) => this.onLoginError(error),
            });
    }

    private onLoginError(error: HttpErrorResponse) {
        let validationError: ValidationErrors | null = null;
        let message: string;

        if (INVALID_CREDENTIALS_STATUS_CODE.includes(error.status)) {
            validationError = { invalidCredentials: true };
            message = 'Invalid username/password';
        } else {
            validationError = { unexpectedError: true };
            message = 'Something unexpected went wrong while trying to log in. Try again later';
        }
        this.error$.next(message);
        this.form.setErrors({
            ...this.form.errors,
            ...validationError,
        });
    }

    private onLoginSuccess() {
        this.success$.next('Login successful');
    }
}
