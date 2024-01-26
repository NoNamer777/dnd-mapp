import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaIconsModule } from '../icons';
import { DmaIconButtonHarness } from '../testing';
import { DmaIconButtonComponent, DmaIconButtonType } from './dma-icon-button.component';

describe('DmaIconButtonComponent', () => {
    @Component({
        template: `<button dmaIconButtonLabel="My icon button label" dma-icon-button>
            <dma-icon dma-star-so-icon />
        </button>`,
    })
    class MinimalTestComponent {}

    @Component({
        template: `<button
            dmaIconButtonLabel="My icon button label"
            [dma-icon-button]="buttonType"
            (selectedChange)="onSelect()"
        >
            <dma-icon dma-star-so-icon />
        </button>`,
    })
    class StandardTestComponent {
        buttonType: DmaIconButtonType = 'standard';

        isSelected = false;

        onSelect() {
            this.isSelected = !this.isSelected;
        }
    }

    @Component({
        template: ` <button
            toggle
            dmaIconButtonLabel="My icon button label"
            [dma-icon-button]="buttonType"
            [disabled]="disabled"
            (selectedChange)="onSelect()"
        >
            <dma-icon dma-star-re-icon class="dma-icon-button-unselected" />
            <dma-icon dma-star-so-icon class="dma-icon-button-selected" />
        </button>`,
    })
    class ToggleTestComponent {
        buttonType: DmaIconButtonType = 'standard';

        isSelected = false;
        disabled = false;

        onSelect() {
            this.isSelected = !this.isSelected;
        }
    }

    async function setupTestEnvironment<T = StandardTestComponent>(
        params: { component: Type<T> } = { component: StandardTestComponent as Type<T> }
    ) {
        TestBed.configureTestingModule({
            imports: [DmaIconButtonComponent, DmaIconsModule],
            declarations: [MinimalTestComponent, StandardTestComponent, ToggleTestComponent],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            component: fixture.componentInstance as T,
            harness: await harnessLoader.getHarness(DmaIconButtonHarness),
        };
    }

    it('should not override default button type with minimal setup', async () => {
        const { harness } = await setupTestEnvironment({ component: MinimalTestComponent });

        expect(await harness.getButtonType()).toEqual('standard');
    });

    it('should render button type', async () => {
        const { component, harness } = await setupTestEnvironment();

        expect(await harness.getButtonType()).toEqual('standard');

        component.buttonType = 'filled';
        expect(await harness.getButtonType()).toEqual('filled');

        component.buttonType = 'tonal';
        expect(await harness.getButtonType()).toEqual('tonal');

        component.buttonType = 'outlined';
        expect(await harness.getButtonType()).toEqual('outlined');
    });

    it('should show the label on hover', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isLabelVisible()).toBeFalse();

        await harness.hover();
        expect(await harness.isLabelVisible()).toBeTrue();
        expect(await harness.getLabelText()).toEqual('My icon button label');

        await harness.moveCursorAway();
        expect(await harness.isLabelVisible()).toBeFalse();
    });

    it('should emit selected change', async () => {
        const { component, harness } = await setupTestEnvironment({ component: ToggleTestComponent });

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();

        await harness.click();

        expect(component.isSelected).toBeTrue();
        expect(await harness.isSelected()).toBeTrue();
    });

    it('should not emit selected change when disabled', async () => {
        const { component, harness } = await setupTestEnvironment({ component: ToggleTestComponent });

        component.disabled = true;

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();

        await harness.click();

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();
    });

    it('should not emit selected change when not in toggle mode', async () => {
        const { component, harness } = await setupTestEnvironment();

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();

        await harness.click();

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();
    });
});
