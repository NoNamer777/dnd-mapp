import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RootHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [RootComponent],
            declarations: [TestComponent],
            providers: [provideExperimentalZonelessChangeDetection()],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(RootHarness),
        };
    }

    it('should render the component', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
