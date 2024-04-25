import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-my-profile',
    templateUrl: './my-profile-page.component.html',
    styleUrl: './my-profile-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class MyProfilePage {}
