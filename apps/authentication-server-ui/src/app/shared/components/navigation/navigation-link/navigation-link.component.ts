import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dma-navigation-link',
    templateUrl: './navigation-link.component.html',
    styleUrl: './navigation-link.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule],
})
export class NavigationLinkComponent {
    @Input({ required: true }) public route: string;
}
