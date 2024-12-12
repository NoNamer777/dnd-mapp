import { ComponentHarness } from '@angular/cdk/testing';

export class ThemeHarness extends ComponentHarness {
    public static readonly hostSelector = '[dmaTheme]';

    public async getStyles() {
        return await (await this.host()).getAttribute('style');
    }

    public async getTheme() {
        return await (await this.host()).getAttribute('dmaTheme');
    }
}
