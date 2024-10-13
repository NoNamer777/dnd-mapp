import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { ButtonComponent, ButtonType } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        template: `<button dma-button>My Button</button>`,
    })
    class BasicTestComponent {}

    @Component({
        template: `<button [dma-button]="buttonType()">My Button</button>`,
    })
    class TestComponent {
        public readonly buttonType = signal<ButtonType>('secondary');
    }

    interface TestParams<T> {
        component: Type<T>;
    }

    async function setupTest<T>(params: TestParams<T> = { component: BasicTestComponent as Type<T> }) {
        TestBed.configureTestingModule({
            imports: [ButtonComponent],
            declarations: [params.component],
        });

        const fixture = TestBed.createComponent(params.component);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(ButtonHarness),
            fixture: fixture,
            component: fixture.componentInstance,
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });

    it('should set the button type', async () => {
        const { harness, component } = await setupTest({ component: TestComponent });

        expect(await harness.getButtonType()).toBe('secondary');

        component.buttonType.set('primary');
        expect(await harness.getButtonType()).toBe('primary');
    });
});
