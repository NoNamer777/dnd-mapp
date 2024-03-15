import { ComponentHarness } from '@angular/cdk/testing';
import { DmaIconHarness } from '../icon/dma-icon.harness';
import { DmaInputHarness } from '../input/dma-input.harness';
import { DmaMenuTriggerHarness } from '../menu/dma-menu-trigger.harness';
import { DmaOptionHarness } from './dma-option.harness';

export class DmaSelectHarness extends ComponentHarness {
    static readonly hostSelector = 'dma-select';

    private readonly inputLocator = this.locatorFor(DmaInputHarness);
    private readonly menuTriggerLocator = this.locatorFor(DmaMenuTriggerHarness);

    private readonly iconLocator = this.locatorFor(DmaIconHarness);

    private readonly optionsLocator = this.documentRootLocatorFactory().locatorForAll(DmaOptionHarness);

    private readonly backdropLocator = this.documentRootLocatorFactory().locatorForOptional('.cdk-overlay-backdrop');

    async text() {
        return await (await this.inputLocator()).value();
    }

    async value() {
        return await (await this.host()).getAttribute('value');
    }

    async isOpened() {
        return (await (await this.iconLocator()).getIcon()) === 'caret-up';
    }

    async isClosed() {
        return (await (await this.iconLocator()).getIcon()) === 'caret-down';
    }

    async open() {
        await (await this.menuTriggerLocator()).open('.input-container');
    }

    async getOptions() {
        return await this.optionsLocator();
    }

    async selectOptionByIndex(index: number) {
        await (await this.getOptions())[index].select();
    }

    async selectOption(index: number) {
        await this.open();
        await this.selectOptionByIndex(index);
    }

    async getSelectedOption() {
        return await this.documentRootLocatorFactory().locatorForOptional(DmaOptionHarness.with({ selected: true }))();
    }

    async backdropClick() {
        await (await this.backdropLocator())?.click();
    }
}
