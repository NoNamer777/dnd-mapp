import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DmaIconComponent } from '@dnd-mapp/shared-components';
import { Subject, takeUntil } from 'rxjs';
import { DmaAuthenticationService } from '../../../authentication';
import { DmaNavButtonComponent } from './nav-button/dma-nav-button.component';
import { DmaNavLinkComponent } from './nav-link/dma-nav-link.component';
import { DmaNavbarBrandComponent } from './navbar-brand/dma-navbar-brand.component';
import { DmaNavbarMenuComponent } from './navbar-menu/dma-navbar-menu.component';

@Component({
    selector: 'dma-nav',
    templateUrl: './dma-nav.component.html',
    styleUrl: './dma-nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        DmaNavbarBrandComponent,
        DmaNavbarMenuComponent,
        DmaNavLinkComponent,
        DmaIconComponent,
        DmaNavButtonComponent,
    ],
})
export class DmaNavComponent implements OnDestroy {
    private readonly authenticationService = inject(DmaAuthenticationService);
    private readonly router = inject(Router);
    private readonly ngZone = inject(NgZone);

    protected readonly authenticatedUser$ = this.authenticationService.authenticatedUser$;

    private readonly destroy$ = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected onSignOut() {
        this.authenticationService
            .signOut()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => this.ngZone.run(() => this.router.navigateByUrl('/login')),
            });
    }
}
