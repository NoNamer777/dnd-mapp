import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { AccountStatus } from '@dnd-mapp/data';
import { IconsModule, TooltipModule } from '../../../shared';

@Component({
    selector: 'dma-account-status-dot',
    templateUrl: './account-status-dot.component.html',
    styleUrl: './account-status-dot.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconsModule, TooltipModule],
})
export class AccountStatusDotComponent {
    @Input() public status: AccountStatus;

    @HostBinding('style') protected get color() {
        switch (this.status) {
            case 'Active':
                return 'color: var(--success);';
            case 'Deactivated':
                return 'opacity: var(--opacity-disabled);';
            case 'Deleted':
                return 'opacity: var(--opacity-disabled);';
            case 'Pending':
                return 'color: var(--warning);';
            case 'Suspended':
                return 'color: var(--danger);';
        }
    }
}
