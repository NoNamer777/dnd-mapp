import { NgModule } from '@angular/core';
import { HouseIcon } from './house/house.icon';
import { UserGroupIcon } from './user-group/user-group.icon';

const icons = [HouseIcon, UserGroupIcon];

@NgModule({
    imports: [...icons],
    exports: [...icons],
})
export class IconsModule {}
