import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent, IconsModule, TooltipModule, TranslationModule } from '../../../shared';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'dma-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrl: './user-actions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, IconsModule, TooltipModule, TranslationModule],
})
export class UserActionsComponent {
    private readonly usersService = inject(UsersService);
    protected readonly destroyRef = inject(DestroyRef);

    @Input() public userId: string;

    protected onEdit() {
        this.usersService.edit(this.userId);
    }

    protected onDelete() {
        this.usersService.delete(this.userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
}
