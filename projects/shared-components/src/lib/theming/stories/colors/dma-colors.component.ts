import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { red } from '@dnd-mapp/shared-components';

@Component({
    selector: 'dma-colors',
    templateUrl: './dma-colors.component.html',
    styleUrl: './dma-colors.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class DmaColorsComponent {
    protected readonly red = red;
}
