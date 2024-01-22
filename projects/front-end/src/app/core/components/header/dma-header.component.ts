import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DmaIconsModule } from '../../../shared';
import { DmaAuthenticationService } from '../../authentication';

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrl: './dma-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, DmaIconsModule],
})
export class DmaHeaderComponent implements OnDestroy {
    authenticatedUser$ = this.authenticationService.authenticatedUser$;

    readonly destroy$ = new Subject<void>();

    constructor(
        private readonly authenticationService: DmaAuthenticationService,
        private readonly router: Router
    ) {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSignOut() {
        this.authenticationService
            .signOut()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: async () => await this.router.navigate(['/authentication/login']),
            });
    }
}
