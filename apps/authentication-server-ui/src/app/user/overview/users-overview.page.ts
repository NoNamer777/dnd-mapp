import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent, IconsModule, TableModule, TranslationModule } from '../../shared';
import { User } from '../models';

@Component({
    selector: 'dma-users-overview',
    templateUrl: './users-overview.page.html',
    styleUrl: './users-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, IconsModule, TranslationModule, TableModule],
})
export class UsersOverviewPage {
    protected readonly users = signal<User[]>([]);
}
