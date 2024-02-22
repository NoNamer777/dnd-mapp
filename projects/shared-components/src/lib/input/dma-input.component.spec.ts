import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaInputHarness } from '../testing';
import { DmaInputComponent } from './dma-input.component';

describe('DmaInputComponent', () => {
    @Component({
        template: `
            <dma-input
                label="Label text"
                [disabled]="disabled"
                [readonly]="readonly"
                [value]="value"
                [supportingText]="supportingText"
            ></dma-input>
        `,
    })
    class TestComponent {
        disabled: boolean;
        readonly: boolean;
        value: string;

        supportingText: string;
    }

    interface TestParams {
        disabled?: boolean;
        readonly?: boolean;
        value?: string;
        supportingText?: string;
    }

    async function setupTestEnvironment(params?: TestParams) {
        TestBed.configureTestingModule({
            imports: [DmaInputComponent, NoopAnimationsModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params?.disabled) {
            fixture.componentInstance.disabled = params.disabled;
        }
        if (params?.readonly) {
            fixture.componentInstance.readonly = params.readonly;
        }
        if (params?.value) {
            fixture.componentInstance.value = params.value;
        }
        if (params?.supportingText) {
            fixture.componentInstance.supportingText = params.supportingText;
        }
        return {
            harness: await harnessLoader.getHarness(DmaInputHarness),
            testComponent: fixture.componentInstance,
        };
    }

    it('should render label when present', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasLabel()).toBeTrue();
        expect(await harness.label()).toEqual('Label text');
    });

    it('should move label on focus and blur', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasLabelMovedUp()).toBeFalse();

        await harness.focus();

        expect(await harness.isFocused()).toBeTrue();
        expect(await harness.hasLabelMovedUp()).toBeTrue();

        await harness.blur();

        expect(await harness.isFocused()).toBeFalse();
        expect(await harness.hasLabelMovedUp()).toBeFalse();
    });

    it('should not move the label back when the input has a value', async () => {
        const { harness } = await setupTestEnvironment();

        await harness.focus();
        await harness.setValue('test');
        await harness.blur();

        expect(await harness.isFocused()).toBeFalse();
        expect(await harness.hasLabelMovedUp()).toBeTrue();
    });

    it('should should set disabled state', async () => {
        const { harness, testComponent } = await setupTestEnvironment();

        expect(await harness.isDisabled()).toBeFalse();

        testComponent.disabled = true;
        expect(await harness.isDisabled()).toBeTrue();
    });

    it('should not focus when disabled', async () => {
        const { harness } = await setupTestEnvironment({ disabled: true });

        expect(await harness.isFocused()).toBeFalse();

        await harness.focus();
        expect(await harness.isFocused()).toBeFalse();
    });

    it('should not focus when readonly', async () => {
        const { harness } = await setupTestEnvironment({ readonly: true });

        expect(await harness.isFocused()).toBeFalse();

        await harness.focus();
        expect(await harness.isFocused()).toBeFalse();
    });

    it('should apply label state on initialization', async () => {
        const { harness } = await setupTestEnvironment({ value: 'Test' });

        expect(await harness.hasLabelMovedUp()).toBeTrue();
    });

    it('should render supporting text when set', async () => {
        const { harness, testComponent } = await setupTestEnvironment();

        expect(await harness.hasSupportingText()).toBeFalse();

        testComponent.supportingText = 'Supporting text';

        expect(await harness.hasSupportingText()).toBeTrue();
        expect(await harness.supportingText()).toEqual('Supporting text');
    });
});
