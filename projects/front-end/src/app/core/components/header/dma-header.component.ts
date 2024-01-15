import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaAuthenticationService } from '../../authentication';

@Component({
    selector: 'dma-header',
    templateUrl: './dma-header.component.html',
    styleUrls: ['./dma-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmaHeaderComponent {
    authenticatedUser$ = this.authenticationService.authenticatedUser$;

    constructor(private readonly authenticationService: DmaAuthenticationService) {}
}
