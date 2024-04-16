import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-story-overview',
    templateUrl: './dma-story-overview.page.html',
    styleUrl: './dma-story-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaStoryOverviewPage {}
