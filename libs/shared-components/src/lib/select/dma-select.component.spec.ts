import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaSelectHarness } from '../testing';
import { DmaSelectModule } from './dma-select.module';

describe('DmaSelect', () => {
    @Component({
        template: `
            <dma-select
                label="Label text"
                forLabel="value-select"
                [value]="value"
                [disabled]="disabled"
                (valueChange)="onValueChange($event)"
            >
                <dma-option value="option-1" label="Option 1" />
                <dma-option value="option-2" label="Option 2" />
                <dma-option value="option-3" label="Option 3" disabled />
                <dma-option value="option-4" label="Option 4" />
            </dma-select>
        `,
    })
    class TestComponent {
        valueChanged = false;

        value: unknown;

        disabled: boolean;

        onValueChange(newValue: unknown) {
            this.valueChanged = true;
            this.value = newValue;
        }
    }

    async function setupTest(params?: { value?: unknown; disabled?: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaSelectModule, NoopAnimationsModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params?.value) {
            fixture.componentInstance.value = params.value;
        }
        if (params?.disabled) {
            fixture.componentInstance.disabled = params.disabled;
        }
        return {
            harness: await harnessLoader.getHarness(DmaSelectHarness),
            component: fixture.componentInstance,
        };
    }

    it('should initialize with no value', async () => {
        const { harness } = await setupTest();

        expect(await harness.text()).toEqual('');
    });

    it('should initialize with a value through the binding', async () => {
        const { harness, component } = await setupTest({ value: 'option-1' });

        expect(await harness.text()).toEqual('Option 1');
        expect(await harness.value()).toEqual('option-1');
        expect(component.valueChanged).toBeFalse();
    });

    it('should not initialize with a value with an unknown value', async () => {
        const { harness, component } = await setupTest({ value: 'option-5' });

        expect(await harness.text()).toEqual('');
        expect(await harness.value()).toEqual('option-5');

        expect(component.valueChanged).toBeFalse();
        expect(component.value).toEqual('option-5');
    });

    it('should set the value by clicking on a option', async () => {
        const { harness, component } = await setupTest();

        expect(await harness.isClosed()).toBeTrue();

        await harness.open();
        expect(await harness.isOpened()).toBeTrue();

        const options = await harness.getOptions();

        expect(options).toHaveSize(4);

        await options[1].select();
        expect(await harness.isClosed()).toBeTrue();
        expect(await harness.text()).toEqual('Option 2');
        expect(await harness.value()).toEqual('option-2');
        expect(component.valueChanged).toBeTrue();

        await harness.open();
        expect(await (await harness.getSelectedOption()).text()).toEqual(await options[1].text());
    });

    it('should not be able to select a disabled option', async () => {
        const { harness, component } = await setupTest();

        await harness.selectOption(2);
        expect(await harness.isOpened()).toBeTrue();

        expect(await harness.text()).toEqual('');
        expect(await harness.value()).toBeNull();
        expect(component.valueChanged).toBeFalse();
    });

    it('should close the select but not set a value while clicking on the backdrop', async () => {
        const { harness, component } = await setupTest();

        await harness.open();
        expect(await harness.isOpened()).toBeTrue();

        await harness.backdropClick();
        expect(await harness.isClosed()).toBeTrue();

        expect(await harness.text()).toEqual('');
        expect(await harness.value()).toBeNull();
        expect(component.valueChanged).toBeFalse();
    });

    it('should change the select option', async () => {
        const { harness, component } = await setupTest({ value: 'option-2' });

        expect(await harness.text()).toEqual('Option 2');

        await harness.open();

        let selectedOption = await harness.getSelectedOption();
        expect(await selectedOption.text()).toEqual('Option 2');

        await harness.selectOptionByIndex(3);
        expect(await harness.text()).toEqual('Option 4');
        expect(await harness.value()).toEqual('option-4');
        expect(component.valueChanged).toBeTrue();

        await harness.open();

        selectedOption = await harness.getSelectedOption();
        expect(await selectedOption.text()).toEqual('Option 4');
    });

    it('should not emit a value change on selecting a selected option', async () => {
        const { harness, component } = await setupTest({ value: 'option-1' });

        await harness.selectOption(0);
        expect(component.valueChanged).toBeFalse();
    });

    it('should not open when disabled', async () => {
        const { harness, component } = await setupTest({ disabled: true });

        await harness.open();
        expect(await harness.isOpened()).toBeFalse();

        component.disabled = false;

        await harness.open();
        expect(await harness.isOpened()).toBeTrue();
    });
});
