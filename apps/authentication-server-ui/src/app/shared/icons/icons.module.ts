import { NgModule } from '@angular/core';
import { HouseIcon } from './house/house.icon';

const icons = [HouseIcon];

@NgModule({
    imports: [...icons],
    exports: [...icons],
})
export class IconsModule {}
