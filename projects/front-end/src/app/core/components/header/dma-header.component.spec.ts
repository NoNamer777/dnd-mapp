import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { environment } from '../../../../environments';
import { DmaHeaderHarness, provideDmaHttpTesting } from '../../../../testing';
import { inMemoryStorageProvider } from '../../../shared';
import { DmaAuthenticationService } from '../../authentication';
import { DmaHeaderComponent } from './dma-header.component';

describe('DmaHeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    const identityToken =
        'identity-token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJKeTNQOWNaclgtU0oxOG04Iiwic3ViIjoxLCJjbHQiOiJGVDB1NktNck8waU9oRFFnck1BU2lBOEExYTkxeFhNQyIsIm5iZiI6MTcwNTkxMzk0NywiaWF0IjoxNzA1OTEzOTQ3LCJleHAiOjE3MDU5NDk5NDcsInVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoiVXNlcjEiLCJlbWFpbEFkZHJlc3MiOiJ1c2VyMUBkb21haW4uY29tIiwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiUGxheWVyIn1dfSwiYXVkIjpbImh0dHBzOi8vbG9jYWxob3N0LmRuZG1hcHAubmV0Il0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0LmRuZG1hcHAubmV0In0.iSpP0LYYcq33QIopqYJxH6SeDE9fhCkgKFG9p2KpwzyWaGySQlsrYgdeJ8fY9y8CGcegu-KKLDG_bHfRKU1vHg; ';

    async function setupTestEnvironment(params: { authenticated?: boolean } = {}) {
        TestBed.configureTestingModule({
            imports: [
                DmaHeaderComponent,
                RouterTestingModule.withRoutes([{ path: 'authentication/login', redirectTo: '', pathMatch: 'full' }]),
            ],
            providers: [provideDmaHttpTesting(), inMemoryStorageProvider(), DmaAuthenticationService],
            declarations: [TestComponent],
        });

        const cookieSpy = spyOnProperty(document, 'cookie');
        cookieSpy.and.returnValue(!params.authenticated ? '' : identityToken);

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(DmaHeaderHarness),
            testingController: TestBed.inject(HttpTestingController),
            fixture: fixture,
            cookieSpy: cookieSpy,
        };
    }

    it('should show unauthorized links', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isNavItemByLabelVisible('Sign up')).toBeTrue();
        expect(await harness.isNavItemByLabelVisible('Log in')).toBeTrue();
    });

    it('should show authenticated links when a User is logged in', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isNavItemByLabelVisible(defaultUser.username)).toBeTrue();
    });

    it('should send a log out request when logging out', async () => {
        const { harness, testingController, cookieSpy } = await setupTestEnvironment({ authenticated: true });

        expect(await harness.isUserDropdownOpen()).toBeFalse();

        await harness.openUserDropdown();
        expect(await harness.isUserDropdownOpen()).toBeTrue();

        await harness.signOut();

        const response = testingController.expectOne(environment.baseBackEndURL + '/authentication/sign-out');

        cookieSpy.and.returnValue('');
        response.flush(null, {
            headers: {
                'Set-Cookie': `identity-token= ; Path=/; Domain=${environment.baseBackEndURL.replace('server', '')};`,
            },
        });

        expect(await harness.isNavItemByLabelVisible('Log in')).toBeTrue();
    });
});
