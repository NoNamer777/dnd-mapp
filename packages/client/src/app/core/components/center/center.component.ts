import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './center.component.html',
    styleUrls: ['./center.component.scss'],
})
export class CenterComponent {}
