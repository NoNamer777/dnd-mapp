import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ButtonComponent, IconsModule, TableModule, TranslationModule } from '../../shared';
import { UsersService } from '../services/users.service';
import { UserActionsComponent } from './actions/user-actions.component';

@Component({
    selector: 'dma-users-overview',
    templateUrl: './users-overview.page.html',
    styleUrl: './users-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ButtonComponent, IconsModule, TranslationModule, TableModule, UserActionsComponent],
})
export class UsersOverviewPage implements OnInit {
    protected readonly usersService = inject(UsersService);
    protected readonly destroyRef = inject(DestroyRef);

    protected readonly busy = signal(true);

    public ngOnInit() {
        this.usersService
            .getAll()
            .pipe(
                tap(() => this.busy.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }
}
