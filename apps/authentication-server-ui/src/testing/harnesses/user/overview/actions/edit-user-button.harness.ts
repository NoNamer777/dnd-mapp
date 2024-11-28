import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness } from '@dnd-mapp/authentication-server-ui/testing';

export class EditUserButtonHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-edit-user-button';

    private readonly buttonLocator = this.locatorFor(ButtonHarness);

    public async click() {
        await (await this.buttonLocator()).click();
    }
}
