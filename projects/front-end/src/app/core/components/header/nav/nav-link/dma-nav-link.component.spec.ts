import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaNavLinkHarness } from '@dnd-mapp/front-end/testing';
import { DmaNavLinkComponent } from './dma-nav-link.component';

describe('DmaNavLinkComponent', () => {
    @Component({
        template: `<dma-nav-link label="Label" path="/my-route" />`,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [DmaNavLinkComponent, RouterTestingModule],
            declarations: [TestComponent],
        });

        const router = TestBed.inject(Router);

        spyOn(router, 'navigateByUrl');

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaNavLinkHarness.with({ label: 'Label' })),
            router: router,
        };
    }

    it('should handle navigating to a route', async () => {
        const { harness, router } = await setupTest();

        expect(router.navigateByUrl).not.toHaveBeenCalled();

        await harness.navigate();
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
});
