import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-my-profile',
    templateUrl: './dma-my-profile.page.html',
    styleUrl: './dma-my-profile.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaMyProfilePage {}
