import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MyProfileHarness } from '@dnd-mapp/front-end/testing';
import { MyProfilePage } from './my-profile-page.component';

describe('MyProfilePage', () => {
    @Component({
        template: '<dma-my-profile />',
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [MyProfilePage],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(MyProfileHarness),
        };
    }

    it('should initialize', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
