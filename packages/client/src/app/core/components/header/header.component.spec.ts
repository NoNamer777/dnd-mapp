import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HeaderHarness } from '../../../../testing';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
    @Component({
        template: '<dma-header></dma-header>',
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [HeaderModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(HeaderHarness),
        };
    }

    it('should show the components text content', async () => {
        const { harness } = await setupTestEnvironment();
        expect(await harness.getTextContent()).toEqual('Header component works!');
    });
});
