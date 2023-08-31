import { ComponentHarness } from '@angular/cdk/testing';

export class ButtonHarness extends ComponentHarness {
    static hostSelector = 'button[dma-button]';

    async getButtonType() {
        return await (await this.host()).getAttribute('dma-button');
    }

    async click() {
        await (await this.host()).click();
    }
}
