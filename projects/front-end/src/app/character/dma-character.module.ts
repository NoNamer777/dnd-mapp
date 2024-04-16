import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { characterRoutes } from './config/character.routes';

@NgModule({
    imports: [RouterModule.forChild(characterRoutes)],
    exports: [RouterModule],
})
export class DmaCharacterModule {}
