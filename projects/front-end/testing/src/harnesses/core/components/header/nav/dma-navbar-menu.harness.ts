import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { DmaNavLinkHarness } from './dma-nav-link.harness';

interface DmaNavbarMenuFilters extends BaseHarnessFilters {
    label?: string;
}

export class DmaNavbarMenuHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-navbar-menu';

    static readonly with = (options: DmaNavbarMenuFilters) =>
        new HarnessPredicate(DmaNavbarMenuHarness, options).addOption('label', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.label(), label)
        );

    private readonly menuContentLocator = this.documentRootLocatorFactory().locatorForOptional('.dma-nav-menu-content');
    private readonly menuTriggerLocator = this.locatorFor('button[cdkOverlayOrigin]');

    async label() {
        return await (await this.host()).text();
    }

    async isOpen() {
        return Boolean(await this.menuContentLocator());
    }

    async toggle() {
        await (await this.menuTriggerLocator()).click();
    }

    async clickNavLink(label: string) {
        const navLink = await this.documentRootLocatorFactory().locatorFor(DmaNavLinkHarness.with({ label: label }))();

        await navLink.navigate();
    }
}
