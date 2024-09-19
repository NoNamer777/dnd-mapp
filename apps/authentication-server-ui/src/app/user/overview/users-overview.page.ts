import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, IconsModule } from '../../shared';

@Component({
    selector: 'dma-users-overview',
    templateUrl: './users-overview.page.html',
    styleUrl: './users-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, IconsModule],
})
export class UsersOverviewPage {}
