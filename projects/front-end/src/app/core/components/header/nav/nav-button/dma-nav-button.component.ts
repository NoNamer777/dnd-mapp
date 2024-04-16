import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dma-nav-button',
    templateUrl: './dma-nav-button.component.html',
    styleUrl: './dma-nav-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DmaNavButtonComponent {
    @Input() label: string;
}
