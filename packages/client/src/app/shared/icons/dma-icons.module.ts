import { NgModule } from '@angular/core';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule],
})
export class DmaIconsModule {
    constructor(library: FaIconLibrary, config: FaConfig) {
        library.addIcons(...icons);

        config.fixedWidth = true;
    }
}

const icons: IconDefinition[] = [faCircleUser];
