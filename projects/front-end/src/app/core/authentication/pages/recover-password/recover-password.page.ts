import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-recover-password',
    templateUrl: './recover-password.page.html',
    styleUrl: './recover-password.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class RecoverPasswordPage {}
