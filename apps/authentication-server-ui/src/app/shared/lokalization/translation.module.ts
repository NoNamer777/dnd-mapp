import { NgModule } from '@angular/core';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
    imports: [TranslatePipe],
    exports: [TranslatePipe],
})
export class TranslationModule {}
