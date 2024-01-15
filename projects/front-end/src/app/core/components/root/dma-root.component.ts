import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DmaThemeDirective } from '../../theming';

@Component({
    selector: 'dma-root',
    templateUrl: './dma-root.component.html',
    styleUrls: ['./dma-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DmaThemeDirective],
})
export class DmaRootComponent {
    constructor(private configService: ConfigService) {}

    @HostListener('window:beforeunload')
    beforeunloadHandler() {
        this.configService.storeConfig();
    }
}
