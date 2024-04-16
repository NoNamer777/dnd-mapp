import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaThemeDirective } from '@dnd-mapp/shared-components';
import { DmaCenterComponent } from '../center';
import { DmaHeaderComponent } from '../header';

@Component({
    selector: 'dma-root',
    templateUrl: './dma-root.component.html',
    styleUrls: ['./dma-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DmaThemeDirective],
    standalone: true,
    imports: [DmaHeaderComponent, DmaCenterComponent],
})
export class DmaRootComponent {}
