import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationPayload } from '../../models';
import { lifetimeBarComponent } from '../lifetime-bar/lifetime-bar.component';
import { appearAnimation } from './appear.animation';

@Component({
    selector: 'dma-notification',
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [appearAnimation],
    standalone: true,
    imports: [CommonModule, lifetimeBarComponent],
})
export class NotificationComponent implements OnDestroy {
    @Input() payload: NotificationPayload;

    @HostBinding('@appear') protected appear = true;

    @HostBinding('class')
    get notificationType() {
        return `${this.payload.type}-notification`;
    }

    readonly destroy$ = new Subject<void>();

    get typeToBackground() {
        switch (this.payload.type) {
            case 'success':
                return 'var(--success)';
            default:
                return 'var(--error)';
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
