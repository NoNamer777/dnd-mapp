import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

interface ButtonFilters extends BaseHarnessFilters {
    label?: string;
}

export class ButtonHarness extends ComponentHarness {
    public static hostSelector = 'button[dma-button-type]';

    public static with = (options: ButtonFilters) =>
        new HarnessPredicate(ButtonHarness, options).addOption('button label', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label)
        );

    public async getLabel() {
        return await (await this.host()).text();
    }

    public async click() {
        await (await this.host()).click();
    }

    public async getButtonType() {
        return await (await this.host()).getAttribute('dma-button-type');
    }
}
