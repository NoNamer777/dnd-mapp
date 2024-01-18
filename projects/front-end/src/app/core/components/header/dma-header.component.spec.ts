import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { DmaHeaderHarness, DmaHttpRequestTestingModule } from '../../../../testing';
import { inMemoryStorageProvider } from '../../../shared';
import { DmaAuthenticationService } from '../../authentication';
import { DmaHeaderModule } from './dma-header.module';

describe('DmaHeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHeaderModule, RouterTestingModule, DmaHttpRequestTestingModule],
            providers: [inMemoryStorageProvider(), DmaAuthenticationService],
            declarations: [TestComponent],
        });

        // TODO: Remove once authentication service has been finished implemented
        spyOn(console, 'warn');

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaHeaderHarness),
        };
    }

    it('should show unauthorized links', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isNavItemByLabelVisible('Sign up')).toBeTrue();
        expect(await harness.isNavItemByLabelVisible('Log in')).toBeTrue();
    });

    // TODO: Disabled until authentication is completed and we switched over to using cookies
    xit('should show authenticated links when a User is logged in', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isNavItemByLabelVisible(defaultUser.username)).toBeTrue();
    });
});
