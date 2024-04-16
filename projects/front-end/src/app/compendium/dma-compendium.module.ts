import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { compendiumRoutes } from './config/compendium.routes';

@NgModule({
    imports: [RouterModule.forChild(compendiumRoutes)],
    exports: [RouterModule],
})
export class DmaCompendiumModule {}
