import { ComponentHarness } from '@angular/cdk/testing';

export class AccountStatusHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-account-status-dot';

    public async getStyling() {
        return await (await this.host()).getAttribute('style');
    }
}
