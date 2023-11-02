import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defaultUser } from '@dnd-mapp/data/testing';
import { DmaHeaderHarness, DmaHttpRequestTestingModule } from '../../../../testing';
import { TOKEN_STORAGE_KEY, inMemoryStorageProvider } from '../../../shared';
import { DmaAuthenticationService } from '../../authentication';
import { DmaHeaderModule } from './dma-header.module';

describe('DmaHeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5ODkxNjcxNCwibmJmIjoxNjk4OTE2NzE0LCJleHAiOjE2OTg5Mjc1MTR9.pK9FW6brgVsUJewKZ8sNn17mNnHj-pAx7Hbry2ZSiqTjTYzYtrB8WhBpcNQN9IYJzJ6GwZXLA4Og3Zord0E1bg';

    async function setupTestEnvironment(params?: { authenticated: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaHeaderModule, RouterTestingModule, DmaHttpRequestTestingModule],
            providers: [
                inMemoryStorageProvider(params?.authenticated ? { [TOKEN_STORAGE_KEY]: token } : undefined),
                DmaAuthenticationService,
            ],
            declarations: [TestComponent],
        });

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

    it('should show authenticated links when a User is logged in', async () => {
        const { harness } = await setupTestEnvironment({ authenticated: true });

        expect(await harness.isNavItemByLabelVisible(defaultUser.username)).toBeTrue();
    });
});
