import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export class RootComponent {}
