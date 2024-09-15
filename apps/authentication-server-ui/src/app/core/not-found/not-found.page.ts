import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-not-found',
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class NotFoundPage {}
