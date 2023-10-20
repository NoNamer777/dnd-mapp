import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, finalize, take, takeUntil } from 'rxjs';
import { DmaAuthenticationService } from '../../services';

const UNAUTHORIZED_ERROR_STATUS_CODE = 401;

@Component({
    selector: 'dma-login',
    templateUrl: './dma-login.page.html',
    styleUrls: ['./dma-login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                take(1),
                finalize(() => this.loading$.next(false)),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: () => this.onLoginSuccess(),
                error: (error: HttpErrorResponse) => this.onLoginError(error),
            });
    }

    private onLoginError(error: HttpErrorResponse) {
        const message =
            error.status === UNAUTHORIZED_ERROR_STATUS_CODE
                ? 'Invalid username/password'
                : 'Something unexpected went wrong while trying to log in. Try again later';

        const formError =
            error.status == UNAUTHORIZED_ERROR_STATUS_CODE ? { invalidCredentials: true } : { unexpectedError: true };

        this.error$.next(message);
        this.form.setErrors({
            ...this.form.errors,
            ...formError,
        });
    }

    private onLoginSuccess() {
        this.success$.next('Login successful');
    }
}
