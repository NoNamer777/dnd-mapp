import { ComponentHarness } from '@angular/cdk/testing';

export class UserActionsHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-user-actions';

    private readonly editButtonLocator = this.locatorFor('button[dma-button]:has(dma-icon[dma-pen-to-square-icon])');
    private readonly deleteButtonLocator = this.locatorFor('button[dma-button]:has(dma-icon[dma-trash-icon])');

    public async edit() {
        await (await this.editButtonLocator()).click();
    }

    public async delete() {
        await (await this.deleteButtonLocator()).click();
    }
}
