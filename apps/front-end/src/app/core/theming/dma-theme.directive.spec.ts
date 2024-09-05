import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaThemeHarness } from '../../../testing';
import { DmaThemeModule } from './dma-theme.module';
import { DmaTheme, DmaThemes } from './models';

describe('DmaThemeDirective', () => {
    @Component({
        template: `
            <html id="root">
                <body>
                    <div [dmaTheme]="theme">Custom element</div>
                </body>
            </html>
        `,
    })
    class TestComponent {
        theme: DmaTheme = DmaThemes.DARK;
    }

    async function initializeTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaThemeModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(DmaThemeHarness),
            document: TestBed.inject(DOCUMENT).documentElement,
            component: fixture.componentInstance,
        };
    }

    function getActiveThemeOnDocument(document: HTMLElement) {
        return document.getAttribute('data-bs-theme');
    }

    it('should initialize with theme', async () => {
        const { harness, document } = await initializeTestEnvironment();

        expect(await harness.getActiveTheme()).toEqual('dark');
        expect(getActiveThemeOnDocument(document)).toEqual('dark');
    });

    it('should change the active theme', async () => {
        const { harness, component, document } = await initializeTestEnvironment();

        component.theme = DmaThemes.LIGHT;

        expect(await harness.getActiveTheme()).toEqual('light');
        expect(getActiveThemeOnDocument(document)).toEqual('light');
    });
});
