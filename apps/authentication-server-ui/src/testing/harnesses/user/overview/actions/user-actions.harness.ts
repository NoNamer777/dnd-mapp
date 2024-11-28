import { ComponentHarness } from '@angular/cdk/testing';
import { DeleteUserButtonHarness } from './delete-user-button.harness';
import { EditUserButtonHarness } from './edit-user-button.harness';

export class UserActionsHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-user-actions';

    private readonly editButtonLocator = this.locatorFor(EditUserButtonHarness);
    private readonly deleteButtonLocator = this.locatorFor(DeleteUserButtonHarness);

    public async edit() {
        await (await this.editButtonLocator()).click();
    }

    public async delete() {
        await (await this.deleteButtonLocator()).click();
    }
}
