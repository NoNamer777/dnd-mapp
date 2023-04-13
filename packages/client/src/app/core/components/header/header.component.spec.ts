import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HeaderComponentHarness } from '../../../../testing';
import { HeaderModule } from './header.module';
import { Component } from '@angular/core';

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
            harness: await harnessLoader.getHarness(HeaderComponentHarness),
        };
    }

    it('should show the components text content', async () => {
        const { harness } = await setupTestEnvironment();
        expect(await harness.getTextContent()).toEqual('Header component works!');
    });
});
