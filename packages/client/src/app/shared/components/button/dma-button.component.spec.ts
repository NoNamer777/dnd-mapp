import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaButtonHarness } from '../../../../testing';
import { DmaButtonVariant, DmaButtonVariants } from './dma-button.component';
import { DmaButtonModule } from './dma-button.module';

describe('ButtonComponent', () => {
    @Component({
        template: `<button
            type="button"
            [dma-button]="buttonVariant"
            [toggle]="toggle"
            [outlined]="outlined"
            [small]="small"
            [large]="large"
        >
            My Button
        </button>`,
    })
    class TestComponent {
        buttonVariant: DmaButtonVariant = DmaButtonVariants.PRIMARY;
        toggle = false;
        outlined = false;
        small = false;
        large = false;
    }

    @Component({
        template: `<button type="button" dma-button>My Button</button>`,
    })
    class DefaultTestComponent {}

    async function initializeTestEnvironment<T = TestComponent>(
        params: { component: Type<T>; toggle?: true } = { component: TestComponent as Type<T> }
    ) {
        TestBed.configureTestingModule({
            imports: [DmaButtonModule],
            declarations: [DefaultTestComponent, TestComponent],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params.toggle) {
            (fixture.componentInstance as TestComponent).toggle = true;
            fixture.detectChanges();
        }

        return {
            component: fixture.componentInstance,
            harness: await harnessLoader.getHarness(DmaButtonHarness),
        };
    }

    it('should create with default values', async () => {
        const { harness } = await initializeTestEnvironment({ component: DefaultTestComponent });

        expect(await harness.isButtonVariant(DmaButtonVariants.PRIMARY)).toBeTrue();
        expect(await harness.isOutlinedVariant()).toBeFalse();
        expect(await harness.isLargeButton()).toBeFalse();
        expect(await harness.isSmallButton()).toBeFalse();
        expect(await harness.isToggleButton()).toBeFalse();
    });

    it('should render as a small button', async () => {
        const { component, harness } = await initializeTestEnvironment();

        expect(await harness.isSmallButton()).toBeFalse();

        component.small = true;
        expect(await harness.isSmallButton()).toBeTrue();
    });

    it('should render as a large button', async () => {
        const { component, harness } = await initializeTestEnvironment();

        expect(await harness.isLargeButton()).toBeFalse();

        component.large = true;
        expect(await harness.isLargeButton()).toBeTrue();
    });

    it('should fallback to primary variant', async () => {
        const { component, harness } = await initializeTestEnvironment();

        component.buttonVariant = 'test' as DmaButtonVariants;
        expect(await harness.isButtonVariant(DmaButtonVariants.PRIMARY)).toBeTrue();

        component.buttonVariant = null as unknown as DmaButtonVariants;
        expect(await harness.isButtonVariant(DmaButtonVariants.PRIMARY)).toBeTrue();
    });

    it('should render outlined button variant', async () => {
        const { component, harness } = await initializeTestEnvironment();

        component.outlined = true;
        expect(await harness.isOutlinedVariant()).toBeTrue();
    });

    it('should function as toggle button', async () => {
        const { harness } = await initializeTestEnvironment({ component: TestComponent, toggle: true });

        expect(await harness.isToggleButton()).toBeTrue();
        expect(await harness.isToggleActive()).toBeFalse();

        await harness.click();
        expect(await harness.isToggleActive()).toBeTrue();

        await harness.click();
        expect(await harness.isToggleActive()).toBeFalse();
    });

    it('should render the button variant', async () => {
        const { component, harness } = await initializeTestEnvironment();

        expect(await harness.isButtonVariant(DmaButtonVariants.PRIMARY)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.SECONDARY;
        expect(await harness.isButtonVariant(DmaButtonVariants.PRIMARY)).toBeFalse();
        expect(await harness.isButtonVariant(DmaButtonVariants.SECONDARY)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.SUCCESS;
        expect(await harness.isButtonVariant(DmaButtonVariants.SUCCESS)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.DANGER;
        expect(await harness.isButtonVariant(DmaButtonVariants.DANGER)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.WARNING;
        expect(await harness.isButtonVariant(DmaButtonVariants.WARNING)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.INFO;
        expect(await harness.isButtonVariant(DmaButtonVariants.INFO)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.DARK;
        expect(await harness.isButtonVariant(DmaButtonVariants.DARK)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.LIGHT;
        expect(await harness.isButtonVariant(DmaButtonVariants.LIGHT)).toBeTrue();

        component.buttonVariant = DmaButtonVariants.LINK;
        expect(await harness.isButtonVariant(DmaButtonVariants.LINK)).toBeTrue();
    });
});
