import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoryOverviewHarness } from '@dnd-mapp/front-end/testing';
import { StoryOverviewPage } from './story-overview.page';

describe('StoryOverviewPage', () => {
    @Component({
        template: '<dma-story-overview />',
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [StoryOverviewPage],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(StoryOverviewHarness),
        };
    }

    it('should initialize', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
