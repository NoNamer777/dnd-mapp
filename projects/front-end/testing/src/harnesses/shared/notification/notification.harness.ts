import { ComponentHarness } from '@angular/cdk/testing';

export class NotificationHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-notification';

    async isErrorNotification() {
        return await (await this.host()).hasClass('error-notification');
    }

    async isSuccessNotification() {
        return await (await this.host()).hasClass('success-notification');
    }
}
