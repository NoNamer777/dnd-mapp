import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaNavbarBrandHarness } from '@dnd-mapp/front-end/testing';
import { DmaNavbarBrandComponent } from './dma-navbar-brand.component';

describe('DmaNavbarBrandComponent', () => {
    @Component({
        template: '<dma-navbar-brand />',
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [DmaNavbarBrandComponent, RouterTestingModule],
            declarations: [TestComponent],
        });

        const router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl');

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaNavbarBrandHarness),
            router: router,
        };
    }

    it('should navigate to the home page', async () => {
        const { harness, router } = await setupTest();

        expect(router.navigateByUrl).not.toHaveBeenCalled();

        await harness.navigateToHome();
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
});
