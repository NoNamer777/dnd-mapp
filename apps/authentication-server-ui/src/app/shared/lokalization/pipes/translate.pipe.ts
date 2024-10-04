import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
    standalone: true,
    name: 'translate',
})
export class TranslatePipe implements PipeTransform {
    private readonly translationService = inject(TranslationService);

    transform(translationKey: string) {
        return this.translationService.getTranslation(translationKey);
    }
}
