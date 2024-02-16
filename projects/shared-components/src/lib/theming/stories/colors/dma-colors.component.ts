import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { colors } from '../../colors';

@Component({
    selector: 'dma-colors',
    templateUrl: './dma-colors.component.html',
    styleUrl: './dma-colors.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class DmaColorsComponent {
    protected readonly colors = colors;

    getBoxId(colorName: string, percentage: number) {
        return colorName.replace(' ', '-') + `${percentage}`;
    }
}
