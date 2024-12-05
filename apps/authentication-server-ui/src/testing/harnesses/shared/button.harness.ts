import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { ButtonType } from '../../../app/shared';

interface ButtonFilters extends BaseHarnessFilters {
    label?: string;
    type?: ButtonType;
}

export class ButtonHarness extends ComponentHarness {
    public static hostSelector = 'button[dma-button-type]';

    public static with = (options: ButtonFilters) =>
        new HarnessPredicate(ButtonHarness, options).addOption('button label', options.label, (harness, label) =>
            HarnessPredicate.stringMatches(harness.getLabel(), label)
        );

    private readonly processingIconLocator = this.locatorForOptional('dma-icon[dma-spinner-icon]');

    public async click() {
        await (await this.host()).click();
    }

    public async getButtonType() {
        return await (await this.host()).getAttribute('dma-button-type');
    }

    public async getLabel() {
        return await (await this.host()).text();
    }

    public async getButtonWidth() {
        return (await (await this.host()).getDimensions()).width;
    }

    public async isDisabled() {
        return await (await this.host()).getProperty<boolean>('disabled');
    }

    public async isProcessing() {
        return Boolean(await this.processingIconLocator());
    }
}
