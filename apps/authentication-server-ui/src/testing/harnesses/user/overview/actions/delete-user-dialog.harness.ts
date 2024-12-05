import { ButtonHarness, DialogHarness } from '../../../shared';

export class DeleteUserDialogHarness extends DialogHarness {
    private readonly cancelButtonLocator = this.locatorFor(ButtonHarness.with({ label: 'Cancel' }));
    private readonly deleteButtonLocator = this.locatorFor(ButtonHarness.with({ label: 'Delete' }));

    public async cancel() {
        await (await this.cancelButtonLocator()).click();
    }

    public async delete() {
        await (await this.deleteButtonLocator()).click();
    }
}
