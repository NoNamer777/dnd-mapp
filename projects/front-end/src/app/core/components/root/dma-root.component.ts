import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DmaThemeDirective, DmaThemeModule } from '../../theming';
import { DmaCenterComponent } from '../center';
import { DmaHeaderComponent } from '../header';

@Component({
    selector: 'dma-root',
    templateUrl: './dma-root.component.html',
    styleUrls: ['./dma-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DmaThemeDirective],
    standalone: true,
    imports: [CommonModule, DmaHeaderComponent, DmaCenterComponent, DmaThemeModule],
})
export class DmaRootComponent {
    constructor(private configService: ConfigService) {}

    @HostListener('window:beforeunload')
    beforeunloadHandler() {
        this.configService.storeConfig();
    }
}
