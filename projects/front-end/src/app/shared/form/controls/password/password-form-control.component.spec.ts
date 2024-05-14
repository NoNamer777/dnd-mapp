import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordFromControlHarness, TEST_INITIALIZER, withInitializedConfig } from '@dnd-mapp/front-end/testing';
import { PasswordFormControlComponent } from './password-form-control.component';

describe('PasswordFormControlComponent', () => {
    @Component({
        template: ` <form [formGroup]="form">
            <dma-password-form-control label="Password" inputId="password-input" inputFormControlName="password" />
        </form>`,
    })
    class TestComponent {
        form = new FormGroup({});
    }

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [PasswordFormControlComponent, ReactiveFormsModule],
            providers: [provideHttpClient(), withInitializedConfig()],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        await TestBed.inject(TEST_INITIALIZER)();

        return {
            hostComponent: fixture.componentInstance,
            harness: await harnessLoader.getHarness(PasswordFromControlHarness),
        };
    }

    it('should add the control to the form', async () => {
        const { hostComponent } = await setupTestEnvironment();

        expect(hostComponent.form.get('password')).not.toBeUndefined();
    });

    it('should setup the form control', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getInputFieldType()).toEqual('password');
        expect(await harness.getInputFieldFormControlName()).toEqual('password');
        expect(await harness.getLabelForAttribute()).toEqual('password-input');
        expect(await harness.getLabelContents()).toEqual('Password');
        expect(await harness.getShownIcon()).toEqual('eye');
    });

    it('should toggle the visibility of the password', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getInputFieldType()).toEqual('password');
        expect(await harness.getShownIcon()).toEqual('eye');

        await harness.togglePasswordVisibility();

        expect(await harness.getInputFieldType()).toEqual('text');
        expect(await harness.getShownIcon()).toEqual('eye-slash');

        await harness.togglePasswordVisibility();

        expect(await harness.getInputFieldType()).toEqual('password');
        expect(await harness.getShownIcon()).toEqual('eye');
    });
});
