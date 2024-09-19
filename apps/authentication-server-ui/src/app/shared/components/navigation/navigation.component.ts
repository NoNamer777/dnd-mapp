import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class NavigationComponent {}
