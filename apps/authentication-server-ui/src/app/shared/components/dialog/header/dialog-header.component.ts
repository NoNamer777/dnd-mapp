import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CloseDialogButtonComponent } from '../close-button/close-dialog-button.component';

@Component({
    selector: 'dma-dialog-header',
    standalone: true,
    imports: [CommonModule, CloseDialogButtonComponent],
    templateUrl: './dialog-header.component.html',
    styleUrl: './dialog-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeaderComponent {}
