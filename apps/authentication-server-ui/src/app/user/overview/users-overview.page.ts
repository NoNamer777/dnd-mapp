import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@dnd-mapp/data';
import { tap } from 'rxjs';
import { ButtonComponent, IconsModule, TableModule, TranslationModule } from '../../shared';
import { UsersOverviewStore } from '../services/users-overview-store';
import { UsersService } from '../services/users.service';
import { UserActionsComponent } from './actions/user-actions.component';

@Component({
    selector: 'dma-users-overview',
    templateUrl: './users-overview.page.html',
    styleUrl: './users-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UsersOverviewStore],
    standalone: true,
    imports: [ButtonComponent, IconsModule, TranslationModule, TableModule, UserActionsComponent],
})
export class UsersOverviewPage implements OnInit {
    protected readonly destroyRef = inject(DestroyRef);
    protected readonly usersService = inject(UsersService);
    private readonly usersOverviewStore = inject(UsersOverviewStore);

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

    protected onUserSelected(user: User) {
        this.usersOverviewStore.selectedUser.set(user);
    }
}
