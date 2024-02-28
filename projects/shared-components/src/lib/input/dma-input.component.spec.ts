import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DmaIconComponent } from '@dnd-mapp/shared-components';
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
        standalone: true,
        imports: [DmaInputComponent],
    })
    class TestComponent {
        disabled: boolean;
        readonly: boolean;
        value: string;

        supportingText: string;
    }

    @Component({
        template: `
            <dma-input label="Label text">
                <dma-icon class="leading-icon" icon="magnifying-glass"></dma-icon>
            </dma-input>
        `,
        standalone: true,
        imports: [DmaInputComponent, DmaIconComponent],
    })
    class LeadingIconTestComponent {}

    @Component({
        template: `
            <form [formGroup]="form">
                <dma-input formControlName="inputField"></dma-input>
            </form>
        `,
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule, DmaInputComponent],
    })
    class FormTestComponent {
        protected form = new FormGroup({
            inputField: new FormControl<string>(null),
        });

        addValidator(validator: ValidatorFn) {
            this.form.controls.inputField.addValidators(validator);
        }
    }

    interface TestParams<T> {
        component: Type<T>;
        disabled?: boolean;
        readonly?: boolean;
        value?: string;
        supportingText?: string;
        formControlValidator?: ValidatorFn;
    }

    async function setupTestEnvironment<T = TestComponent>(
        params: TestParams<T> = { component: TestComponent as Type<T> }
    ) {
        TestBed.configureTestingModule({
            imports: [
                DmaInputComponent,
                NoopAnimationsModule,
                TestComponent,
                LeadingIconTestComponent,
                FormTestComponent,
            ],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params.component === TestComponent) {
            if (params?.disabled) {
                (fixture.componentInstance as TestComponent).disabled = params.disabled;
            }
            if (params?.readonly) {
                (fixture.componentInstance as TestComponent).readonly = params.readonly;
            }
            if (params?.value) {
                (fixture.componentInstance as TestComponent).value = params.value;
            }
            if (params?.supportingText) {
                (fixture.componentInstance as TestComponent).supportingText = params.supportingText;
            }
        }
        if (params.component === FormTestComponent) {
            if (params.formControlValidator) {
                (fixture.componentInstance as FormTestComponent).addValidator(params.formControlValidator);
            }
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
        const { harness } = await setupTestEnvironment({ disabled: true, component: TestComponent });

        expect(await harness.isFocused()).toBeFalse();

        await harness.focus();
        expect(await harness.isFocused()).toBeFalse();
    });

    it('should not focus when readonly', async () => {
        const { harness } = await setupTestEnvironment({ readonly: true, component: TestComponent });

        expect(await harness.isFocused()).toBeFalse();

        await harness.focus();
        expect(await harness.isFocused()).toBeFalse();
    });

    it('should apply label state on initialization', async () => {
        const { harness } = await setupTestEnvironment({ value: 'Test', component: TestComponent });

        expect(await harness.hasLabelMovedUp()).toBeTrue();
    });

    it('should render supporting text when set', async () => {
        const { harness, testComponent } = await setupTestEnvironment();

        expect(await harness.hasSupportingText()).toBeFalse();

        testComponent.supportingText = 'Supporting text';

        expect(await harness.hasSupportingText()).toBeTrue();
        expect(await harness.supportingText()).toEqual('Supporting text');
    });

    it('should set when the input field contains a leading icon', async () => {
        const { harness } = await setupTestEnvironment({ component: LeadingIconTestComponent });

        expect(await harness.containsLeadingIcon()).toBeTrue();
    });

    describe('Form support', () => {
        it('should mark as touched when blurring', async () => {
            const { harness } = await setupTestEnvironment({ component: FormTestComponent });

            expect(await harness.isTouched()).toBeFalse();
            expect(await harness.isUntouched()).toBeTrue();

            await harness.focus();
            await harness.blur();

            expect(await harness.isTouched()).toBeTrue();
            expect(await harness.isUntouched()).toBeFalse();
        });

        it('should mark as touched and changed when changing value and blurring', async () => {
            const { harness } = await setupTestEnvironment({ component: FormTestComponent });

            expect(await harness.isTouched()).toBeFalse();
            expect(await harness.isUntouched()).toBeTrue();

            expect(await harness.isDirty()).toBeFalse();
            expect(await harness.isPristine()).toBeTrue();

            await harness.setValue('Value');

            expect(await harness.isTouched()).toBeTrue();
            expect(await harness.isUntouched()).toBeFalse();

            expect(await harness.isDirty()).toBeTrue();
            expect(await harness.isPristine()).toBeFalse();
        });

        it('should mark as invalid or valid when validating as form control', async () => {
            const { harness } = await setupTestEnvironment({
                component: FormTestComponent,
                formControlValidator: Validators.required,
            });

            expect(await harness.isValid()).toBeFalse();
            expect(await harness.isInvalid()).toBeTrue();

            await harness.setValue('Value');

            expect(await harness.isValid()).toBeTrue();
            expect(await harness.isInvalid()).toBeFalse();
        });

        it('should only mark as valid when touched and changed', async () => {
            const { harness } = await setupTestEnvironment({
                component: FormTestComponent,
                formControlValidator: Validators.required,
            });

            expect(await harness.isValid()).toBeFalse();
            expect(await harness.isInvalid()).toBeTrue();

            await harness.setValue('Value');

            expect(await harness.isValid()).toBeTrue();
            expect(await harness.isInvalid()).toBeFalse();
        });
    });
});
