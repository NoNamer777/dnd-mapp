import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotificationHarness } from '@dnd-mapp/front-end/testing';
import { NotificationPayload } from '../../models';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
    @Component({
        template: '<dma-notification [payload]="payload" />',
    })
    class TestComponent {
        payload: NotificationPayload;
    }

    async function setupTest(params: { payload: NotificationPayload }) {
        TestBed.configureTestingModule({
            imports: [NotificationComponent],
            declarations: [TestComponent],
            providers: [provideAnimationsAsync('noop')],
        });

        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.payload = params.payload;

        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(NotificationHarness),
        };
    }

    it('should show an error notification', fakeAsync(async () => {
        const { harness } = await setupTest({
            payload: { title: 'My Error notification', type: 'error', message: 'Something bad happened' },
        });

        discardPeriodicTasks();

        expect(await harness.isErrorNotification()).toBeTrue();
    }));

    it('should show an success notification', fakeAsync(async () => {
        const { harness } = await setupTest({
            payload: { title: 'My Success notification', type: 'success', message: 'Something good happened' },
        });

        discardPeriodicTasks();

        expect(await harness.isSuccessNotification()).toBeTrue();
    }));
});
