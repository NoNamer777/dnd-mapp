import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { shouldMatchValidator } from './should-match.validator';

describe('ShouldMatchValidator', () => {
    @Component({
        template: `
            <form [formGroup]="form">
                <input type="text" formControlName="controlA" />
                <input type="text" formControlName="controlB" />
            </form>
        `,
    })
    class TestComponent {
        form = new FormGroup(
            {
                controlA: new FormControl<string>(''),
                controlB: new FormControl<string>(''),
            },
            {
                validators: [shouldMatchValidator('controlA', 'controlB')],
            }
        );

        getControlErrors(controlName: keyof typeof this.form.controls) {
            return this.form.controls[controlName].errors;
        }
    }

    interface InputHarnessFilters extends BaseHarnessFilters {
        formControlName?: string;
    }

    class InputHarness extends ComponentHarness {
        static readonly hostSelector = 'input';

        static with = (options: InputHarnessFilters) =>
            new HarnessPredicate(InputHarness, options).addOption(
                'formcontrolname',
                options.formControlName,
                (harness, name) => HarnessPredicate.stringMatches(harness.getFormControlName(), name)
            );

        isValid = async () => await (await this.host()).hasClass('ng-valid');

        async setInput(value: string) {
            const testElement = await this.host();

            await testElement.setInputValue(value);
            await testElement.dispatchEvent('input');
        }

        private getFormControlName = async () => await (await this.host()).getAttribute('formcontrolname');
    }

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            componentInstance: fixture.componentInstance,
            inputAHarness: await harnessLoader.getHarness(InputHarness.with({ formControlName: 'controlA' })),
            inputBHarness: await harnessLoader.getHarness(InputHarness.with({ formControlName: 'controlB' })),
        };
    }

    it('should mark as invalid when 2 inputs do not have the same value', async () => {
        const { componentInstance, inputAHarness, inputBHarness } = await setupTest();

        expect(componentInstance.getControlErrors('controlA')).toBeNull();
        expect(componentInstance.getControlErrors('controlB')).toBeNull();
        expect(await inputAHarness.isValid()).toBeTrue();
        expect(await inputBHarness.isValid()).toBeTrue();

        await inputAHarness.setInput('test');

        expect(componentInstance.getControlErrors('controlA')).toEqual({
            shouldMatch: 'Control A should match Control B',
        });
        expect(componentInstance.getControlErrors('controlB')).toEqual({
            shouldMatch: 'Control A should match Control B',
        });
        expect(await inputAHarness.isValid()).toBeFalse();
        expect(await inputBHarness.isValid()).toBeFalse();
    });

    it('should remove the error after correction', async () => {
        const { componentInstance, inputAHarness, inputBHarness } = await setupTest();

        await inputAHarness.setInput('test');
        await inputAHarness.setInput('');

        expect(componentInstance.getControlErrors('controlA')).toBeNull();
        expect(componentInstance.getControlErrors('controlB')).toBeNull();
        expect(await inputAHarness.isValid()).toBeTrue();
        expect(await inputBHarness.isValid()).toBeTrue();
    });

    it('should remove the error setting input B to same value as input A', async () => {
        const { componentInstance, inputAHarness, inputBHarness } = await setupTest();

        await inputAHarness.setInput('test');
        await inputBHarness.setInput('test');

        expect(componentInstance.getControlErrors('controlA')).toBeNull();
        expect(componentInstance.getControlErrors('controlB')).toBeNull();
        expect(await inputAHarness.isValid()).toBeTrue();
        expect(await inputBHarness.isValid()).toBeTrue();
    });
});
