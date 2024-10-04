import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationModule } from '../../shared';

@Component({
    selector: 'dma-not-found',
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule, TranslationModule],
})
export class NotFoundPage {}
