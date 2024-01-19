import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DmaIconsModule } from '../../../shared';
import { DmaAuthenticationService } from '../../authentication';

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrl: './dma-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, DmaIconsModule],
})
export class DmaHeaderComponent {
    authenticatedUser$ = this.authenticationService.authenticatedUser$;

    constructor(private readonly authenticationService: DmaAuthenticationService) {}
}
