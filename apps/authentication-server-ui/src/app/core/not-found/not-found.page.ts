import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationModule } from '../../shared';

@Component({
    selector: 'dma-not-found',
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, TranslationModule],
})
export class NotFoundPage {}
