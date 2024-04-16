import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dma-navbar-brand',
    templateUrl: './dma-navbar-brand.component.html',
    styleUrl: './dma-navbar-brand.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule],
})
export class DmaNavbarBrandComponent {}
