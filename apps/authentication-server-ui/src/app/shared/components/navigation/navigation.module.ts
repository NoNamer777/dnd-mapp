import { NgModule } from '@angular/core';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';
import { NavigationComponent } from './navigation.component';

const components = [NavigationComponent, NavigationLinkComponent];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class NavigationModule {}
