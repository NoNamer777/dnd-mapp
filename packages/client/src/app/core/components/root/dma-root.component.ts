import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaThemeDirective } from '../../theming';

@Component({
    selector: 'dma-root',
    templateUrl: './dma-root.component.html',
    styleUrls: ['./dma-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DmaThemeDirective],
})
export class DmaRootComponent {}
