import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    @Component({
        template: `<dma-navigation></dma-navigation>`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [NavigationComponent],
            declarations: [TestComponent],
            providers: [provideExperimentalZonelessChangeDetection()],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(NavigationHarness),
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});