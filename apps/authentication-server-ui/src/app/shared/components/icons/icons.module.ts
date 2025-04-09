import { NgModule } from '@angular/core';
import { CheckIcon } from './check/check.icon';
import { CircleExclamationIcon } from './circle-exclamation/circle-exclamation.icon';
import { CircleIcon } from './circle/circle.icon';
import { EnvelopeIcon } from './envelope/envelope.icon';
import { HouseIcon } from './house/house.icon';
import { LockIcon } from './lock/lock.icon';
import { PenToSquareIcon } from './pen-to-square/pen-to-square.icon';
import { PlusIcon } from './plus/plus.icon';
import { SpinnerIcon } from './spinner/spinner.icon';
import { TrashIcon } from './trash/trash.icon';
import { UserGroupIcon } from './user-group/user-group.icon';
import { UserIcon } from './user/user.icon';
import { XmarkIcon } from './xmark/xmark.icon';

const icons = [
    CheckIcon,
    CircleIcon,
    CircleExclamationIcon,
    EnvelopeIcon,
    HouseIcon,
    LockIcon,
    PenToSquareIcon,
    PlusIcon,
    SpinnerIcon,
    TrashIcon,
    UserIcon,
    UserGroupIcon,
    XmarkIcon,
];

@NgModule({
    imports: [...icons],
    exports: [...icons],
})
export class IconsModule {}
