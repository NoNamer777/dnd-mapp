import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-game-rules',
    templateUrl: './dma-game-rules.page.html',
    styleUrl: './dma-game-rules.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaGameRulesPage {}
