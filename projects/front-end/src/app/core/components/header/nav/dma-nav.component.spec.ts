import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserModel } from '@dnd-mapp/data';
import { defaultUser } from '@dnd-mapp/data/testing';
import { DmaNavHarness } from '@dnd-mapp/front-end/testing';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../authentication';
import { DmaNavComponent } from './dma-nav.component';

describe('DmaNavigationComponent', () => {
    @Component({
        template: `<dma-nav />`,
    })
    class TestComponent {}

    @Injectable()
    class MockAuthenticationService {
        authenticatedUser$: BehaviorSubject<UserModel>;
    }

    const authenticationServiceProvider = {
        provide: AuthenticationService,
        useClass: MockAuthenticationService,
    };

    async function setupTest(params?: { authenticated: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaNavComponent],
            providers: [provideHttpClient(), provideRouter([]), authenticationServiceProvider],
            declarations: [TestComponent],
        });

        const authenticationService = TestBed.inject(AuthenticationService) as MockAuthenticationService;
        authenticationService.authenticatedUser$ = new BehaviorSubject<UserModel>(
            params?.authenticated ? defaultUser : null
        );

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
