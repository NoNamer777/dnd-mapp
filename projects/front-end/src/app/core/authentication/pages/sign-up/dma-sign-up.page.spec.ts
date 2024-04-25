import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DmaSignUpHarness } from '@dnd-mapp/front-end/testing';
import { DmaSignUpPage } from './dma-sign-up.page';

xdescribe('DmaSignUpPage', () => {
    @Component({
        template: '<dma-signup></dma-signup>',
    })
    class TestComponent {}

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaSignUpPage, NoopAnimationsModule],
            providers: [provideHttpClient(), provideRouter([])],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaSignUpHarness),
        };
    }

    it('should initialize', async () => {
        const { harness } = await initializeTestEnvironment();

        expect(harness).not.toBeNull();
    });
});
