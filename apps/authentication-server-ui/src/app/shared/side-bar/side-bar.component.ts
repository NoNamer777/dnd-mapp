import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class SideBarComponent {}