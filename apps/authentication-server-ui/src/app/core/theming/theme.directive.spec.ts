import { Component } from '@angular/core';
import { createTestEnvironment, ThemeHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { ThemeDirective } from './theme.directive';
import { Theme, Themes } from './themes';

describe('ThemeDirective', () => {
    @Component({
        template: `<div [dmaTheme]="theme"></div>`,
        imports: [ThemeDirective],
    })
    class TestComponent {
        public theme: Theme = Themes.DARK;
    }

    async function setupTest() {
        const { harness, component } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: ThemeHarness,
        });

        return {
            harness: harness,
            component: component,
        };
    }

    it('should render the theme', async () => {
        const { harness, component } = await setupTest();

        expect(await harness.getStyles()).toContain('--primary');
        expect(await harness.getTheme()).toContain('dark');

        component.theme = Themes.LIGHT;
        expect(await harness.getTheme()).toContain('light');

        component.theme = 'unknown theme' as Theme;
        expect(await harness.getTheme()).toContain('dark');
    });
});
