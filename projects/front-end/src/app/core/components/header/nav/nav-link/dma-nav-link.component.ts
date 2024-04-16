import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dma-nav-link',
    templateUrl: './dma-nav-link.component.html',
    styleUrl: './dma-nav-link.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule],
})
export class DmaNavLinkComponent {
    @Input({ required: true }) label: string;
    @Input({ required: true }) path: string;

    @Output() navigating = new EventEmitter<void>();

    protected onNavigate() {
        this.navigating.emit();
    }
}
