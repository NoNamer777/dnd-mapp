import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationModule } from '../../shared';

@Component({
    selector: 'dma-home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TranslationModule],
})
export class HomePage {}
