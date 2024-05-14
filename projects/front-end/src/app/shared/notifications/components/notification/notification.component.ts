import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, inject, Input } from '@angular/core';
import { NotificationPayload } from '../../models';
import { LifetimeBarComponent } from '../lifetime-bar/lifetime-bar.component';
import { appearAnimation } from './appear.animation';

@Component({
    selector: 'dma-notification',
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [appearAnimation],
    standalone: true,
    imports: [CommonModule, LifetimeBarComponent],
})
export class NotificationComponent {
    @Input() payload: NotificationPayload;

    @HostBinding('@appear') protected appear = true;

    readonly destroyRef = inject(DestroyRef);

    @HostBinding('class')
    get notificationType() {
        return `${this.payload.type}-notification`;
    }

    get typeToBackground() {
        switch (this.payload.type) {
            case 'success':
                return 'var(--success)';
            default:
                return 'var(--error)';
        }
    }
}
