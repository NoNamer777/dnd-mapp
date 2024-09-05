import { ComponentHarness } from '@angular/cdk/testing';

export class DmaThemeHarness extends ComponentHarness {
    static hostSelector = '[dmaTheme]';

    async getTheme() {
        return await (await this.host()).getAttribute('dmaTheme');
    }

    async getStyling() {
        return await (await this.host()).getAttribute('style');
    }
}
