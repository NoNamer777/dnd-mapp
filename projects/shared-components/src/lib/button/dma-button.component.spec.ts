import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaButtonHarness } from '../testing';
import { DmaButtonType } from './dma-button.component';
import { DmaButtonModule } from './dma-button.module';

describe('DmaButtonComponent', () => {
    @Component({
        template: '<button dma-button>Button</button>',
    })
    class MinimalTestComponent {}

    @Component({
        template: '<button [dma-button]="buttonType" [disabled]="disabled" (click)="onClick()">Button</button>',
    })
    class TestComponent {
        buttonType: DmaButtonType = 'elevated';

        clicked = false;
        disabled = false;

        onClick() {
            this.clicked = true;
        }
    }

    async function setupTestEnvironment<T = TestComponent>(
        params: { component: Type<T>; disabled?: boolean } = { component: TestComponent as Type<T> }
    ) {
        TestBed.configureTestingModule({
            imports: [DmaButtonModule],
            declarations: [TestComponent, MinimalTestComponent],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params?.disabled) {
            (fixture.componentInstance as TestComponent).disabled = true;
        }
        return {
            component: fixture.componentInstance,
            harness: await harnessLoader.getHarness(DmaButtonHarness),
        };
    }

    it('should reflect the button type', async () => {
        const { component, harness } = await setupTestEnvironment();

        expect(await harness.getButtonType()).toEqual('elevated');

        component.buttonType = 'tonal';
        expect(await harness.getButtonType()).toEqual('tonal');

        component.buttonType = 'text';
        expect(await harness.getButtonType()).toEqual('text');

        component.buttonType = 'filled';
        expect(await harness.getButtonType()).toEqual('filled');

        component.buttonType = 'outlined';
        expect(await harness.getButtonType()).toEqual('outlined');
    });

    it('should not handle click events when disabled', async () => {
        const { harness } = await setupTestEnvironment({ component: MinimalTestComponent });

        expect(await harness.getButtonType()).toEqual('text');
    });

    it('should handle click events', async () => {
        const { component, harness } = await setupTestEnvironment();

        expect(component.clicked).toBeFalse();

        await harness.click();
        expect(component.clicked).toBeTrue();
    });

    it('should not handle click events when disabled', async () => {
        const { component, harness } = await setupTestEnvironment({ component: TestComponent, disabled: true });

        expect(component.clicked).toBeFalse();

        await harness.click();
        expect(component.clicked).toBeFalse();
    });
});