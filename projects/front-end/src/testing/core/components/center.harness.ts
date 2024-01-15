import { ComponentHarness } from '@angular/cdk/testing';

export class CenterHarness extends ComponentHarness {
    static hostSelector = 'dma-center';

    async getTextContent(): Promise<string> {
        return await (await this.host()).text();
    }
}
