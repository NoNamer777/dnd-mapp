import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: `dma-icon[dma-plus-icon]`,
    templateUrl: './dma-plus-icon.component.html',
    styleUrls: ['../_dma-icon.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaPlusIconComponent {}
