import { ComponentHarness } from '@angular/cdk/testing';

export class DmaThemeHarness extends ComponentHarness {
    static hostSelector = '[dmaTheme]';

    async getActiveTheme() {
        return await (await this.host()).getAttribute('dmaTheme');
    }
}
