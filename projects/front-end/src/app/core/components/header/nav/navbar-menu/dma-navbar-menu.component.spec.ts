import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaNavbarMenuHarness } from '@dnd-mapp/front-end/testing';
import { DmaNavLinkComponent } from '../nav-link/dma-nav-link.component';
import { DmaNavbarMenuComponent } from './dma-navbar-menu.component';

describe('DmaNavbarMenuComponent', () => {
    @Component({
        template: `
            <dma-navbar-menu>
                <dma-nav-link label="Label 1" path="/my-route1" />
                <dma-nav-link label="Label 2" path="/my-route2" />
            </dma-navbar-menu>
        `,
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [DmaNavbarMenuComponent, DmaNavLinkComponent, RouterTestingModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(DmaNavbarMenuHarness),
            fixture: fixture,
        };
    }

    it('should open the menu on click', async () => {
        const { harness } = await setupTest();

        expect(await harness.isOpen()).toBeFalse();

        await harness.toggle();
        expect(await harness.isOpen()).toBeTrue();
    });

    it('should close on click outside of the menu', async () => {
        const { harness, fixture } = await setupTest();

        await harness.toggle();

        (fixture.nativeElement as HTMLElement).click();
        fixture.detectChanges();

        expect(await harness.isOpen()).toBeFalse();
    });

    it('should close on click outside of the menu', async () => {
        const { harness, fixture } = await setupTest();

        await harness.toggle();

        (fixture.nativeElement as HTMLElement).click();

        expect(await harness.isOpen()).toBeFalse();
    });

    it('should navigate and close the menu', async () => {
        const { harness } = await setupTest();
        const router = TestBed.inject(Router);

        spyOn(router, 'navigateByUrl');

        await harness.toggle();
        await harness.clickNavLink('Label 1');

        expect(await harness.isOpen()).toBeFalse();
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
});
