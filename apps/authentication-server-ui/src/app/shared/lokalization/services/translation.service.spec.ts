import { TestBed } from '@angular/core/testing';
import { provideDnDMappTesting } from '@dnd-mapp/authentication-server-ui/testing';
import { firstValueFrom, noop } from 'rxjs';
import { RequestService } from '../../http';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
    interface TestSetupParams {
        initialize: boolean;
    }

    async function setupTest(params: TestSetupParams = { initialize: true }) {
        TestBed.configureTestingModule({
            providers: [provideDnDMappTesting()],
        });

        const translationService = TestBed.inject(TranslationService);

        if (params.initialize) await firstValueFrom(translationService.initialize());
        return {
            translationService: TestBed.inject(TranslationService),
        };
    }

    it('should initialize with the default locale', async () => {
        const { translationService } = await setupTest({ initialize: false });

        expect(translationService.locale()).toBeNull();
        expect(translationService.translations()).toBeNull();

        await firstValueFrom(translationService.initialize());

        expect(translationService.locale()).toEqual('en-US');
        expect(translationService.translations()).toEqual(jasmine.objectContaining({ BTN_LABEL_ADD_USER: 'Add User' }));
    });

    it('should warn for an unknown translation key', async () => {
        const { translationService } = await setupTest();
        const consoleSpy = spyOn(console, 'warn').and.callFake(() => noop());

        const translation = translationService.getTranslation('UNKNOWN_KEY');

        expect(translation).toEqual('UNKNOWN_KEY');
        expect(consoleSpy).toHaveBeenCalledWith('Missing translation for key "UNKNOWN_KEY"');
    });

    it('should return unknown translation key when translations are not initialized', async () => {
        const { translationService } = await setupTest({ initialize: false });
        const consoleSpy = spyOn(console, 'warn').and.callFake(() => noop());

        const translation = translationService.getTranslation('UNKNOWN_KEY');

        expect(translation).toEqual('UNKNOWN_KEY');
        expect(consoleSpy).toHaveBeenCalledWith('Missing translation for key "UNKNOWN_KEY"');
    });

    it('should update the translations when switching locale', async () => {
        const { translationService } = await setupTest();

        expect(translationService.locale()).toEqual('en-US');

        await firstValueFrom(translationService.updateLocale('nl-NL'));

        expect(translationService.locale()).toEqual('nl-NL');
        expect(translationService.translations()).toEqual(
            jasmine.objectContaining({ BTN_LABEL_ADD_USER: 'Gebruiker toevoegen' })
        );
    });

    it('should not update translations when switching to current locale', async () => {
        const { translationService } = await setupTest();
        const requestSpy = spyOn(TestBed.inject(RequestService), 'get');

        expect(translationService.locale()).toEqual('en-US');

        await firstValueFrom(translationService.updateLocale('en-US'));

        expect(translationService.locale()).toEqual('en-US');
        expect(requestSpy).not.toHaveBeenCalled();
    });
});
