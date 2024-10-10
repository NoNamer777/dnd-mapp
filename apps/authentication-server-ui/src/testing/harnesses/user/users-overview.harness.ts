import { ComponentHarness } from '@angular/cdk/testing';
import { TableHarness } from '../shared';

export class UsersOverviewHarness extends ComponentHarness {
    public static hostSelector = 'dma-users-overview';

    private readonly usersTableLocator = this.locatorFor(TableHarness);

    public async getUsersTableHarness() {
        return await this.usersTableLocator();
    }
}
