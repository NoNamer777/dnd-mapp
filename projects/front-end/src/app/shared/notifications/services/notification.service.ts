import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationPayload, notificationLifetime } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly overlay = inject(Overlay);

    private overlayRef: OverlayRef;

    show(payload: NotificationPayload) {
        this.overlayRef = this.overlay.create({ disposeOnNavigation: true, panelClass: 'dma-notification-overlay' });

        const notificationComponentRef = this.overlayRef.attach(new ComponentPortal(NotificationComponent));
        notificationComponentRef.instance.payload = payload;
        notificationComponentRef.changeDetectorRef.detectChanges();

        timer(notificationLifetime)
            .pipe(takeUntilDestroyed(notificationComponentRef.instance.destroyRef))
            .subscribe({
                next: () => this.overlayRef.dispose(),
            });
    }
}
