import { ComponentHarness } from '@angular/cdk/testing';
import { TableHarness } from '../shared';

export class UsersOverviewHarness extends ComponentHarness {
    public static hostSelector = 'dma-users-overview';

    private readonly usersTableLocator = this.locatorFor(TableHarness);
    private readonly busyIcon = this.locatorForOptional('dma-icon[dma-spinner-icon]');

    public async isBusyIconVisible() {
        return Boolean(await this.busyIcon());
    }

    public async getUsersTableHarness() {
        return await this.usersTableLocator();
    }
}
