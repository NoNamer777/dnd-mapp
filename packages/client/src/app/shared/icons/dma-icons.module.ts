import { NgModule } from '@angular/core';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@NgModule({
    imports: [FontAwesomeModule, FontAwesomeTestingModule],
    exports: [FontAwesomeModule, FontAwesomeTestingModule],
})
export class DmaIconsModule {
    constructor(library: FaIconLibrary, config: FaConfig) {
        library.addIcons(...icons);

        config.fixedWidth = true;
    }
}

const icons: IconDefinition[] = [];
