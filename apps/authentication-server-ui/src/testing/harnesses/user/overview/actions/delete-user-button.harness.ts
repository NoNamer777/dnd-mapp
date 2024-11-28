import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness } from '@dnd-mapp/authentication-server-ui/testing';

export class DeleteUserButtonHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-delete-user-button';

    private readonly buttonLocator = this.locatorFor(ButtonHarness);

    public async click() {
        await (await this.buttonLocator()).click();
    }

    public async isProcessing() {
        return await (await this.buttonLocator()).isProcessing();
    }
}
