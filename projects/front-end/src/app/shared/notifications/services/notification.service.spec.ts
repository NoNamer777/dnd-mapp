import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, inject } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotificationHarness } from '@dnd-mapp/front-end/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    @Component({
        template: `<button (click)="onShowNotification()">Show notification</button>`,
    })
    class TestComponent {
        private readonly notificationService = inject(NotificationService);

        onShowNotification() {
            this.notificationService.show({ message: 'Something unexpected happened', type: 'error', title: 'Error' });
        }
    }

    async function setupTest() {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [provideAnimationsAsync('noop')],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

        return {
            buttonElem: fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement,
            harnessLoader: harnessLoader,
        };
    }

    it('should add and automatically remove an notification', fakeAsync(async () => {
        const { buttonElem, harnessLoader } = await setupTest();

        expect(await harnessLoader.hasHarness(NotificationHarness)).toBeFalse();

        buttonElem.click();
        expect(await harnessLoader.hasHarness(NotificationHarness)).toBeTrue();

        tick(8_000);
        expect(await harnessLoader.hasHarness(NotificationHarness)).toBeFalse();
    }));
});
