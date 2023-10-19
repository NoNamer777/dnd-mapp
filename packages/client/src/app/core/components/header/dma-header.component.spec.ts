import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaHeaderHarness } from '../../../../testing';
import { DmaHeaderModule } from './dma-header.module';

describe('DmaHeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHeaderModule, RouterTestingModule],
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
});
