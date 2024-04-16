import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-character-builder',
    templateUrl: './dma-character-builder.page.html',
    styleUrl: './dma-character-builder.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaCharacterBuilderPage {}
