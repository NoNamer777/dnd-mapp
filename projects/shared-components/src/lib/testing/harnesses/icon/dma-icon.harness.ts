import { ComponentHarness } from '@angular/cdk/testing';
import { DmaIconName } from '../../../icons';

export class DmaIconHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-icon';

    async getIcon() {
        return (await (await this.host()).getAttribute('icon')) as DmaIconName;
    }
}
