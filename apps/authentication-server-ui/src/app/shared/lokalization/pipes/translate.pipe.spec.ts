import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideDnDMappTesting, runInitializers } from '@dnd-mapp/authentication-server-ui/testing';
import { provideTranslations } from '../providers';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
    @Component({
        template: `<p>{{ 'PAGE_TITLE_HOME' | translate }}</p>`,
        imports: [TranslatePipe],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideDnDMappTesting(), provideTranslations()],
        });

        await runInitializers();

        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        return {
            template: fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement,
        };
    }

    it('should get the translation of the translation key', async () => {
        const { template } = await setupTest();
        expect(template.textContent).toEqual('DnD-Mapp Authentication Server Portal');
    });
});
