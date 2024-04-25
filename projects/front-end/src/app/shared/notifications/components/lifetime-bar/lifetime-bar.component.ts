import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    inject,
    Input,
    NgZone,
    OnDestroy,
} from '@angular/core';
import { interval, Subject, take, takeUntil } from 'rxjs';
import { notificationLifetime } from '../../models';

const intervalTime = 10;

@Component({
    selector: 'dma-lifetime-bar',
    template: '',
    styleUrl: './lifetime-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class lifetimeBarComponent implements AfterViewInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly ngZone = inject(NgZone);

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    private progress = 0;

    @Input() backgroundColor = 'var(--error)';

    @HostBinding('style.background')
    background =
        `linear-gradient(to right, ${this.backgroundColor} 0%, var(--secondary) 0%, ${this.backgroundColor} 4%)`;

    ngAfterViewInit() {
        interval(intervalTime)
            .pipe(take(notificationLifetime / intervalTime + 1), takeUntil(this.destroy$))
            .subscribe({
                next: (sequence) =>
                    this.ngZone.run(() => {
                        this.progress = Math.floor(((intervalTime * sequence) / notificationLifetime) * 100);

                        this.background = `linear-gradient(to right, ${this.backgroundColor} 0%, var(--secondary) ${this.progress}%, ${this.backgroundColor} ${this.progress + 4}%)`;
                        this.changeDetectorRef.markForCheck();
                    }),
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
