import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { InputHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    @Component({
        template: ` <dma-input type="text" label="My label" />`,
        imports: [InputComponent],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideNoopAnimations()],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(InputHarness),
        };
    }

    it('should render', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
