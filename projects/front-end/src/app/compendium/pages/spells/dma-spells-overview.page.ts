import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-spells-overview',
    templateUrl: './dma-spells-overview.page.html',
    styleUrl: './dma-spells-overview.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaSpellsOverviewPage {}
