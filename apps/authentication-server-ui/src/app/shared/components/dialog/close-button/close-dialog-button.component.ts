import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../button';
import { IconsModule } from '../../icons';
import { DialogRef } from '../dialog-ref';

@Component({
    selector: 'dma-close-dialog-button',
    templateUrl: './close-dialog-button.component.html',
    styleUrl: './close-dialog-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, IconsModule],
})
export class CloseDialogButtonComponent {
    private readonly dialogRef = inject(DialogRef);

    protected onCloseDialog() {
        this.dialogRef.close();
    }
}
