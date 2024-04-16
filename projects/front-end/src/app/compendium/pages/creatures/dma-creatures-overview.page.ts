import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-creatures-overview',
    templateUrl: './dma-creatures-overview.page.html',
    styleUrl: './dma-creatures-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaCreaturesOverviewPage {}
