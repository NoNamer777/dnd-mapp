import { TestBed } from '@angular/core/testing';
import { DmaThemingModule } from '../../dma-theming.module';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DmaThemeHarness } from '@dnd-mapp/shared-components';

describe('DmaThemeDirective', () => {
    @Component({
        template: `<main [dmaTheme]="theme"></main>`,
    })
    class TestComponent {
        theme: unknown = 'light';
    }

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({ imports: [DmaThemingModule], declarations: [TestComponent] });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        return {
            harness: await harnessLoader.getHarness(DmaThemeHarness),
            component: fixture.componentInstance,
        };
    }

    it('should set the theme styling', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getTheme()).toEqual('light');
        expect(await harness.getStyling()).not.toBeUndefined();
    });

    it('should not update styling when setting invalid theme names', async () => {
        const { harness, component } = await setupTestEnvironment();

        const styling = await harness.getStyling();

        expect(styling).not.toBeUndefined();

        component.theme = 'myAwesomeFont';

        expect(await harness.getTheme()).toEqual('light');
        expect(await harness.getStyling()).toEqual(styling);
    });
});
