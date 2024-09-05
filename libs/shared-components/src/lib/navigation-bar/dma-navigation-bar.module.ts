import { NgModule } from '@angular/core';
import { DmaNavigationBarButtonComponent } from './button';
import { DmaNavigationBarComponent } from './dma-navigation-bar.component';

@NgModule({
    imports: [DmaNavigationBarComponent, DmaNavigationBarButtonComponent],
    exports: [DmaNavigationBarComponent, DmaNavigationBarButtonComponent],
})
export class DmaNavigationBarModule {}
