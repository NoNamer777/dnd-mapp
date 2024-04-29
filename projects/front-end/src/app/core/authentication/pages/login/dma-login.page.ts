import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DmaButtonComponent, DmaIconComponent, DmaInputComponent } from '@dnd-mapp/shared-components';
import { BehaviorSubject, finalize, map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services';

const INVALID_CREDENTIALS_STATUS_CODE = [400, 404];

@Component({
    selector: 'dma-login',
    templateUrl: './dma-login.page.html',
    styleUrls: ['./dma-login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        DmaIconComponent,
        DmaInputComponent,
        DmaButtonComponent,
    ],
})
export class DmaLoginPage implements OnDestroy {
    private readonly authenticationService = inject(AuthenticationService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        password: new FormControl<string | null>(null, [Validators.required]),
    });

    @ViewChild(FormGroupDirective, { static: true }) private readonly formGroup: FormGroupDirective;

    loading$ = new BehaviorSubject(false);

    private readonly error$ = new BehaviorSubject<string | null>(null);
    private readonly success$ = new BehaviorSubject<string | null>(null);

    protected readonly message$: Observable<{ type: 'error' | 'success'; message: string }> = merge(
        this.error$.pipe(map((message) => ({ type: 'error' as const, message: message }))),
        this.success$.pipe(map((message) => ({ type: 'success' as const, message: message })))
    );

    private destroy$ = new Subject<void>();

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
        this.success$.next(null);

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

        (document.activeElement as HTMLElement)?.blur();
        this.formGroup.resetForm();

        const redirectTo = this.route.snapshot.queryParams['redirectTo'];

        this.router.navigateByUrl(redirectTo ? redirectTo : '/characters');
    }
}
