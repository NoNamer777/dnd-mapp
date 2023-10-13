import { ComponentHarness } from '@angular/cdk/testing';

export class HeaderHarness extends ComponentHarness {
    static hostSelector = 'dma-header';

    async getTextContent(): Promise<string> {
        return await (await this.host()).text();
    }
}
