import { NgModule } from '@angular/core';
import { HouseIcon } from './house/house.icon';
import { PlusIcon } from './plus/plus.icon';
import { UserGroupIcon } from './user-group/user-group.icon';

const icons = [HouseIcon, PlusIcon, UserGroupIcon];

@NgModule({
    imports: [...icons],
    exports: [...icons],
})
export class IconsModule {}
