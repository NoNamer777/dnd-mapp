import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    HostBinding,
    inject,
    Input,
    NgZone,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, take } from 'rxjs';
import { intervalTime, notificationLifetime } from '../../models';

@Component({
    selector: 'dma-lifetime-bar',
    template: '',
    styleUrl: './lifetime-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class LifetimeBarComponent implements AfterViewInit {
    private readonly destroyRef = inject(DestroyRef);
    private readonly ngZone = inject(NgZone);
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    private progress = 0;

    @Input() backgroundColor = 'var(--error)';

    @HostBinding('style.background')
    background =
        `linear-gradient(to right, ${this.backgroundColor} 0%, var(--secondary) 0%, ${this.backgroundColor} 4%)`;

    ngAfterViewInit() {
        interval(intervalTime)
            .pipe(take(notificationLifetime / intervalTime), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (sequence) =>
                    this.ngZone.run(() => {
                        this.progress = Math.floor(((intervalTime * sequence) / notificationLifetime) * 100);

                        this.background = `linear-gradient(to right, ${this.backgroundColor} 0%, var(--secondary) ${this.progress}%, ${this.backgroundColor} ${this.progress + 4}%)`;
                        this.changeDetectorRef.markForCheck();
                    }),
            });
    }
}
