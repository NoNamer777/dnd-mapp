import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ButtonComponent, IconsModule, TooltipModule, TranslatePipe } from '../../../../shared';
import { UsersOverviewStore } from '../../../services/overview/users-overview-store';

@Component({
    selector: 'dma-delete-user-button',
    templateUrl: './delete-user-button.component.html',
    styleUrl: './delete-user-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TooltipModule, ButtonComponent, TranslatePipe, IconsModule],
})
export class DeleteUserButtonComponent {
    private readonly deleteRef = inject(DestroyRef);
    protected readonly usersOverviewStore = inject(UsersOverviewStore);

    @Output() public readonly deleteUser = new EventEmitter<void>();

    protected onDelete() {
        this.deleteUser.emit();

        this.usersOverviewStore.processing.set(true);

        this.usersOverviewStore
            .delete()
            .pipe(
                takeUntilDestroyed(this.deleteRef),
                finalize(() => {
                    this.usersOverviewStore.processing.set(false);
                    this.usersOverviewStore.selectedUser.set(null);
                })
            )
            .subscribe();
    }
}