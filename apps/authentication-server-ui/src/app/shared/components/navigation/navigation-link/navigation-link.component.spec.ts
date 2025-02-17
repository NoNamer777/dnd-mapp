import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Routes, provideRouter } from '@angular/router';
import { NavigationLinkHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { NavigationLinkComponent } from './navigation-link.component';

describe('NavigationLinkComponent', () => {
    @Component({
        template: `<dma-navigation-link route="/my-link">My Link</dma-navigation-link>`,
        imports: [NavigationLinkComponent],
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
            imports: [TestComponent],
            providers: [provideRouter(routes)],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(NavigationLinkHarness),
        };
    }

    it('should set the link', async () => {
        const { harness } = await setupTest();
        const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

        expect(await harness.getRoute()).toBe('/my-link');

        await harness.navigateToRoute();
        expect(routerSpy).toHaveBeenCalled();
    });
});
