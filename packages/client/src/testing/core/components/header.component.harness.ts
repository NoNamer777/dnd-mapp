import { ComponentHarness } from '@angular/cdk/testing';

export class HeaderComponentHarness extends ComponentHarness {
    static hostSelector = 'dma-header';

    async getTextContent(): Promise<string> {
        return await (await this.host()).text();
    }
}
