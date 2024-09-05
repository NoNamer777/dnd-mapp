import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { DmaMenuTriggerDirective } from './dma-menu-trigger.directive';

@NgModule({
    imports: [OverlayModule, DmaMenuTriggerDirective],
    exports: [OverlayModule, DmaMenuTriggerDirective],
})
export class DmaMenuModule {}
