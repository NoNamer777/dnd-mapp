import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class HomePage {}
