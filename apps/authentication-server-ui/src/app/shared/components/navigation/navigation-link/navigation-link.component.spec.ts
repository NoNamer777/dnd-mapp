import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { NavigationLinkHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { NavigationLinkComponent } from './navigation-link.component';

describe('NavigationLinkComponent', () => {
    @Component({
        template: `<dma-navigation-link route="/my-link">My Link</dma-navigation-link>`,
    })
    class TestComponent {}

    const routes: Routes = [
        {
            path: 'my-link',
            children: [],
        },
    ];

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [NavigationLinkComponent],
            declarations: [TestComponent],
            providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes)],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(NavigationLinkHarness),
        };
    }

    it('should set the link', async () => {
        const { harness } = await setupTest();
        const routerSpy = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');

        expect(await harness.getRoute()).toBe('/my-link');

        await harness.navigateToRoute();
        expect(routerSpy).toHaveBeenCalled();
    });
});