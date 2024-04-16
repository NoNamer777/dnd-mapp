import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { defaultUser } from '@dnd-mapp/data/testing';
import { DmaNavHarness } from '@dnd-mapp/front-end/testing';
import { DmaNavComponent } from './dma-nav.component';

describe('DmaNavigationComponent', () => {
    @Component({
        template: `<dma-nav />`,
    })
    class TestComponent {}

    const identityToken =
        'identity-token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJKeTNQOWNaclgtU0oxOG04Iiwic3ViIjoxLCJjbHQiOiJGVDB1NktNck8waU9oRFFnck1BU2lBOEExYTkxeFhNQyIsIm5iZiI6MTcwNTkxMzk0NywiaWF0IjoxNzA1OTEzOTQ3LCJleHAiOjE3MDU5NDk5NDcsInVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoiVXNlcjEiLCJlbWFpbEFkZHJlc3MiOiJ1c2VyMUBkb21haW4uY29tIiwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiUGxheWVyIn1dfSwiYXVkIjpbImh0dHBzOi8vbG9jYWxob3N0LmRuZG1hcHAubmV0Il0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0LmRuZG1hcHAubmV0In0.iSpP0LYYcq33QIopqYJxH6SeDE9fhCkgKFG9p2KpwzyWaGySQlsrYgdeJ8fY9y8CGcegu-KKLDG_bHfRKU1vHg; ';

    async function setupTest(params?: { authenticated: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaNavComponent],
            providers: [provideHttpClient(), provideRouter([])],
            declarations: [TestComponent],
        });

        const cookieSpy = spyOnProperty(document, 'cookie');
        cookieSpy.and.returnValue(!params?.authenticated ? '' : identityToken);

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaNavHarness),
        };
    }

    it('should show unauthorized links', async () => {
        const { harness } = await setupTest();

        expect(await harness.isSignupBtnVisible()).toBeTrue();
        expect(await harness.isLoginBtnVisible()).toBeTrue();

        expect(await harness.isProfileMenuVisible(defaultUser.username)).toBeFalse();
    });

    it('should show profile when authenticated', async () => {
        const { harness } = await setupTest({ authenticated: true });

        expect(await harness.isSignupBtnVisible()).toBeFalse();
        expect(await harness.isLoginBtnVisible()).toBeFalse();

        expect(await harness.isProfileMenuVisible(defaultUser.username)).toBeTrue();
    });
});
