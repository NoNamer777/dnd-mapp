import { ComponentHarness } from '@angular/cdk/testing';
import { DmaNavLinkHarness } from './dma-nav-link.harness';
import { DmaNavbarMenuHarness } from './dma-navbar-menu.harness';

export class DmaNavHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-nav';

    private readonly loginBtnLocator = this.locatorForOptional(DmaNavLinkHarness.with({ label: 'Log In' }));
    private readonly signupBtnLocator = this.locatorForOptional(DmaNavLinkHarness.with({ label: 'Sign Up' }));

    async isLoginBtnVisible() {
        return Boolean(await this.loginBtnLocator());
    }

    async isSignupBtnVisible() {
        return Boolean(await this.signupBtnLocator());
    }

    async isProfileMenuVisible(username: string) {
        const menuLocator = this.locatorForOptional(DmaNavbarMenuHarness.with({ label: username }));
        return Boolean(await menuLocator());
    }
}
