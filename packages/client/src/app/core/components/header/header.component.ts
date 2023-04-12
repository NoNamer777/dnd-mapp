import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
