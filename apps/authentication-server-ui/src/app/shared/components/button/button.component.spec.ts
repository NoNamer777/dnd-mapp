import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        template: `<button dma-button>My Button</button>`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [ButtonComponent],
            declarations: [TestComponent],
            providers: [provideExperimentalZonelessChangeDetection()],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(ButtonHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
