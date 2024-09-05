import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dma-center',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dma-center.component.html',
    styleUrl: './dma-center.component.scss',
    standalone: true,
    imports: [CommonModule, RouterModule],
})
export class DmaCenterComponent {}
