import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'dma-login',
    templateUrl: './dma-login.page.html',
    styleUrls: ['./dma-login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaLoginPage {
    form = new FormGroup({
        username: new FormControl<string | null>(null, [Validators.required]),
        password: new FormControl<string | null>(null, [Validators.required]),
    });

    get isFormInvalid() {
        return this.form.invalid;
    }

    onSubmit() {
        console.warn('Form submitted', this.form.value);
    }
}
