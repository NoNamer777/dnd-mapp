import { ComponentHarness } from '@angular/cdk/testing';

export class DmaHeaderHarness extends ComponentHarness {
    static hostSelector = 'dma-header';

    private navItemsLocator = this.locatorForAll('.nav-item');

    private userDropdownLocator = this.locatorFor(`.authenticated-dropdown [data-bs-toggle='dropdown']`);

    private userDropdownMenuLocator = this.locatorFor('.authenticated-dropdown .dropdown-menu');

    private logOutBtnLocator = this.locatorFor('.authenticated-dropdown .text-danger');

    async isNavItemByLabelVisible(label: string) {
        return Boolean(await this.findNavItemByLabel(label));
    }

    async findNavItemByLabel(label: string) {
        return (await this.navItemsLocator()).find(async (element) => (await element.text()) === label);
    }

    async isUserDropdownOpen() {
        return await (await this.userDropdownMenuLocator()).hasClass('show');
    }

    async openUserDropdown() {
        await (await this.userDropdownLocator()).click();
    }

    async signOut() {
        await (await this.logOutBtnLocator()).click();
    }
}
