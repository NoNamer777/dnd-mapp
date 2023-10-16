import { ComponentHarness } from '@angular/cdk/testing';
import { DmaButtonVariant } from '../../../../app/shared/components/button/dma-button.component';

export class DmaButtonHarness extends ComponentHarness {
    static hostSelector = 'button[dma-button]';

    async click() {
        await (await this.host()).click();
    }

    async isButtonVariant(buttonVariant: DmaButtonVariant) {
        return await (await this.host()).hasClass(`btn-${buttonVariant}`);
    }

    async isToggleButton() {
        return (await (await this.host()).getAttribute('data-bs-toggle')) === 'button';
    }

    async isToggleActive() {
        return await (await this.host()).hasClass('active');
    }

    async isSmallButton() {
        return await (await this.host()).hasClass('btn-sm');
    }

    async isLargeButton() {
        return await (await this.host()).hasClass('btn-lg');
    }

    async isOutlinedVariant() {
        return (await (await this.host()).getAttribute('class'))!.includes('outline');
    }
}
