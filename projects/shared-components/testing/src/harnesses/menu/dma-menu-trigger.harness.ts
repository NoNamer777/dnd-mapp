import { ComponentHarness } from '@angular/cdk/testing';

export class DmaMenuTriggerHarness extends ComponentHarness {
    static readonly hostSelector = '[dmaMenuTrigger]';

    async open(elementTriggerClassName?: string) {
        if (elementTriggerClassName) {
            await (await this.locatorFor(elementTriggerClassName)()).click();
        }
        await (await this.host()).click();
    }
}
