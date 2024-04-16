import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-character-overview',
    templateUrl: './dma-character-overview.page.html',
    styleUrl: './dma-character-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaCharacterOverviewPage {}
