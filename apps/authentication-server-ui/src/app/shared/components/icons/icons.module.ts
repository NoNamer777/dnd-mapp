import { NgModule } from '@angular/core';
import { CircleIcon } from './circle/circle.icon';
import { HouseIcon } from './house/house.icon';
import { PenToSquareIcon } from './pen-to-square/pen-to-square.icon';
import { PlusIcon } from './plus/plus.icon';
import { SpinnerIcon } from './spinner/spinner.icon';
import { TrashIcon } from './trash/trash.icon';
import { UserGroupIcon } from './user-group/user-group.icon';
import { XmarkIcon } from './xmark/xmark.icon';

const icons = [CircleIcon, HouseIcon, PenToSquareIcon, PlusIcon, SpinnerIcon, TrashIcon, UserGroupIcon, XmarkIcon];

@NgModule({
    imports: [...icons],
    exports: [...icons],
})
export class IconsModule {}
