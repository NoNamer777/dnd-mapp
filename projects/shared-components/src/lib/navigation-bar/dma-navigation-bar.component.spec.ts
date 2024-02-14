import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaIconsModule, DmaNavigationBarComponent } from '@dnd-mapp/shared-components';
import { DmaNavigationBarHarness } from '../testing';
import { DmaNavigationBarButtonComponent } from './button';

describe('DmaNavigationBar', () => {
    @Component({
        template: `
            <footer dma-navigation-bar>
                <dma-navigation-bar-button path="/page-a">
                    <dma-icon icon="star"></dma-icon>Label A
                </dma-navigation-bar-button>
                <dma-navigation-bar-button path="/page-b">
                    <dma-icon icon="star"></dma-icon>Label B
                </dma-navigation-bar-button>
                <dma-navigation-bar-button><dma-icon icon="star"></dma-icon>Label C</dma-navigation-bar-button>
            </footer>
        `,
    })
    class TestComponent {}

    const routes: Routes = [
        { path: '', component: TestComponent },
        { path: 'page-a', component: TestComponent },
        { path: 'page-b', component: TestComponent },
    ];

    async function setupTestEnvironment(params: { activeRoute?: string } = {}) {
        TestBed.configureTestingModule({
            imports: [
                DmaNavigationBarComponent,
                DmaNavigationBarButtonComponent,
                DmaIconsModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [TestComponent],
        });

        if (params.activeRoute) {
            const activatedRoute = TestBed.inject(ActivatedRoute);

            spyOn(activatedRoute.snapshot.url, 'join').and.returnValue(params.activeRoute);
        }
        const fixture = TestBed.createComponent(TestComponent);
        const loader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await loader.getHarness(DmaNavigationBarHarness),
        };
    }

    it('should not start with an active button when no route matches', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasActiveButton()).toBeFalse();
    });

    it('should start with an active button when a route matches', async () => {
        const { harness } = await setupTestEnvironment({ activeRoute: '/page-b' });

        expect(await harness.hasActiveButton()).toBeTrue();
    });

    it('should mark a button as active on click', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasActiveButton()).toBeFalse();

        await (await harness.getButton(1)).select();

        expect(await harness.hasActiveButton()).toBeTrue();

        // Should switch which button is marked as active
        await (await harness.getButton(0)).select();

        expect(await harness.hasActiveButton()).toBeTrue();
        expect(await (await harness.getButton(1)).isActive()).toBeFalse();
        expect(await (await harness.getButton(0)).isActive()).toBeTrue();

        // Should not switch the active button if the same button was clicked
        await (await harness.getButton(0)).select();

        expect(await harness.hasActiveButton()).toBeTrue();
        expect(await (await harness.getButton(0)).isActive()).toBeTrue();
    });

    it('should not set the a button to active when it has not path', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasActiveButton()).toBeFalse();

        await (await harness.getButton(2)).select();

        expect(await harness.hasActiveButton()).toBeFalse();
    });
});
