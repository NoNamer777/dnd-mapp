import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent, TranslatePipe } from '../../../shared';
import { PlusIcon } from '../../../shared/components/icons/plus/plus.icon';
import { UsersOverviewStore } from '../../services/users-overview.store';

@Component({
    selector: 'dma-create-user-button',
    templateUrl: './create-user-button.component.html',
    styleUrl: './create-user-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, PlusIcon, TranslatePipe],
})
export class CreateUserButtonComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly userOverviewStore = inject(UsersOverviewStore);

    protected onCreateUser() {
        this.userOverviewStore.create().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
}
