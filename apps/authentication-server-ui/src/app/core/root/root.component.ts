import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsModule, NavigationModule, SideBarComponent, TranslationModule } from '../../shared';
import { ThemeDirective } from '../theming/theme.directive';

@Component({
    selector: 'dma-root',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThemeDirective],
    imports: [RouterOutlet, SideBarComponent, NavigationModule, IconsModule, TranslationModule],
})
export class RootComponent {}
