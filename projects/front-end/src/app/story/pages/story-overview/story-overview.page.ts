import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-story-overview',
    templateUrl: './story-overview.page.html',
    styleUrl: './story-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class StoryOverviewPage {}
