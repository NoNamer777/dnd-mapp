import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule, NavigationModule, SideBarComponent, TranslationModule } from '../../shared';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule, SideBarComponent, NavigationModule, IconsModule, TranslationModule],
})
export class RootComponent {}
