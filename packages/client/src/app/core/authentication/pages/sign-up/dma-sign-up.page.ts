import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, finalize, takeUntil } from 'rxjs';
import { swipeInOutAnimation } from '../../animations';
import { DmaAuthenticationService } from '../../services';

@Component({
    selector: 'dma-signup',
    templateUrl: './dma-sign-up.page.html',
    styleUrls: ['./dma-sign-up.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [swipeInOutAnimation],
})
export class DmaSignUpPage implements OnDestroy {
    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        emailConfirm: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        password: new FormControl<string | null>(null, [Validators.required]),
        passwordConfirm: new FormControl<string | null>(null, [Validators.required]),
    });

    stage = 1;

    private destroy$ = new Subject<void>();

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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onGoToNextStage() {
        this.stage = 2;
    }

    onGoToPreviousStage() {
        this.stage = 1;
    }

    onSubmit() {
        const { username, email, password } = this.form.value;

        this.authenticationService
            .signUp({ username: username!, password: password!, emailAddress: email! })
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe({
            });
    }

    private getFormControl(controlName: string) {
        return this.form.get(controlName)!;
    }
}
