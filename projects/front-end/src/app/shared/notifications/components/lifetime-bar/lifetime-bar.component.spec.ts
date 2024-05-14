import { manualChangeDetection } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LifetimeBarHarness } from '@dnd-mapp/front-end/testing';
import { LifetimeBarComponent } from './lifetime-bar.component';

describe('LifetimeBarComponent', () => {
    @Component({
        template: '<dma-lifetime-bar />',
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [LifetimeBarComponent],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(LifetimeBarHarness),
            fixture: fixture,
        };
    }

    it('should progress the bar', fakeAsync(async () => {
        const { harness, fixture } = await setupTest();

        await manualChangeDetection(async () => {
            expect(await harness.getBackgroundStyle()).toEqual(
                'background: linear-gradient(to right, var(--error) 0%, var(--secondary) 0%, var(--error) 4%);'
            );

            // Progress time by 1_000 milliseconds
            // Progress should be around 1/8th of the way, or about 12% since progress is updated every 10 milliseconds.
            tick(1000);
            fixture.detectChanges();

            expect(await harness.getBackgroundStyle()).toEqual(
                'background: linear-gradient(to right, var(--error) 0%, var(--secondary) 12%, var(--error) 16%);'
            );
        });

        // Discard the remaining of the interval to finish the test
        discardPeriodicTasks();
    }));
});
