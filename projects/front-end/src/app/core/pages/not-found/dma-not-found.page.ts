import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-not-found',
    templateUrl: './dma-not-found.page.html',
    styleUrl: './dma-not-found.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaNotFoundPage {}
