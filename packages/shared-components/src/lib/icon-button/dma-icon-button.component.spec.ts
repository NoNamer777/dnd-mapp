import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaIconButtonType } from './dma-icon-button.component';
import { DmaIconButtonModule } from './dma-icon-button.module';
import { DmaIconsModule } from '../icons';
import { DmaIconButtonHarness } from '../testing';

describe('DmaIconButtonComponent', () => {
    @Component({
        template: `<button [dma-icon-button]="buttonType" (selectedChange)="onSelect()">
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
        template: ` <button toggle [dma-icon-button]="buttonType" [disabled]="disabled" (selectedChange)="onSelect()">
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

    async function setupTestEnvironment<T>(params: { component: Type<T> }) {
        TestBed.configureTestingModule({
            imports: [DmaIconsModule, DmaIconButtonModule],
            declarations: [StandardTestComponent, ToggleTestComponent],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            component: fixture.componentInstance as T,
            harness: await harnessLoader.getHarness(DmaIconButtonHarness),
        };
    }

    it('should render button type', async () => {
        const { component, harness } = await setupTestEnvironment({ component: StandardTestComponent });

        expect(await harness.getButtonType()).toEqual('standard');

        component.buttonType = 'filled';
        expect(await harness.getButtonType()).toEqual('filled');

        component.buttonType = 'tonal';
        expect(await harness.getButtonType()).toEqual('tonal');

        component.buttonType = 'outlined';
        expect(await harness.getButtonType()).toEqual('outlined');
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
        const { component, harness } = await setupTestEnvironment({ component: StandardTestComponent });

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();

        await harness.click();

        expect(component.isSelected).toBeFalse();
        expect(await harness.isSelected()).toBeFalse();
    });
});
