import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaButtonHarness } from '../testing';
import { DmaButtonComponent, DmaButtonTypes } from './dma-button.component';

describe('DmaButtonComponent', () => {
    @Component({
        template: '<button dma-button>Button</button>',
    })
    class MinimalTestComponent {}

    @Component({
        template: '<button [dma-button]="buttonType" [disabled]="disabled" (click)="onClick()">Button</button>',
    })
    class TestComponent {
        buttonType = DmaButtonTypes.ELEVATED;

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
            imports: [DmaButtonComponent],
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

        component.buttonType = DmaButtonTypes.TONAL;
        expect(await harness.getButtonType()).toEqual('tonal');

        component.buttonType = DmaButtonTypes.TEXT;
        expect(await harness.getButtonType()).toEqual('text');

        component.buttonType = DmaButtonTypes.FILLED;
        expect(await harness.getButtonType()).toEqual('filled');

        component.buttonType = DmaButtonTypes.OUTLINED;
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
