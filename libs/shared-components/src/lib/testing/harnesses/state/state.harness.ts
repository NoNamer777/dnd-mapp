import { ComponentHarness } from '@angular/cdk/testing';

export class StateHarness extends ComponentHarness {
    static hostSelector = '[dmaState]';

    async isFocussed() {
        return (await (await this.host()).getAttribute('dma-focussed')) === '';
    }

    async isHovered() {
        return (await (await this.host()).getAttribute('dma-hovered')) === '';
    }

    async isPressed() {
        return (await (await this.host()).getAttribute('dma-pressed')) === '';
    }

    async isDragging() {
        return (await (await this.host()).getAttribute('dma-dragging')) === '';
    }

    async getAppliedBackgroundStyle() {
        return await (await this.host()).getAttribute('style');
    }
}
