import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

const components = [TooltipComponent, TooltipDirective];

@NgModule({
    imports: [OverlayModule, ...components],
    exports: [...components],
})
export class TooltipModule {}
