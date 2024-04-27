import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DmaIconComponent } from '@dnd-mapp/shared-components';
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
export class DmaNavComponent {
    private readonly authenticationService = inject(DmaAuthenticationService);
    private readonly router = inject(Router);
    private readonly ngZone = inject(NgZone);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly authenticatedUser$ = this.authenticationService.authenticatedUser$;

    protected onSignOut() {
        this.authenticationService
            .signOut()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.ngZone.run(() => this.router.navigateByUrl('/login')),
            });
    }
}
