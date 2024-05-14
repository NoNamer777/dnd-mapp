import { FactoryProvider, InjectionToken } from '@angular/core';
import { SessionBuilder } from '@dnd-mapp/data';
import { mockSessionDB } from '@dnd-mapp/data/testing';
import { HttpResponse, http } from 'msw';
import { PathParams } from 'msw/lib/core/utils/matching/matchRequestUrl';
import { firstValueFrom, switchMap } from 'rxjs';
import { ConfigService, SessionService } from '../../../src/app/shared';
import { baseBackEndURL, getMockServiceWorker } from '../mocks';

export const TEST_INITIALIZER = new InjectionToken<() => Promise<void>>('Unit test initialization function');

export const withInitializedConfig: () => FactoryProvider = () => ({
    provide: TEST_INITIALIZER,
    deps: [ConfigService],
    useFactory: (configService: ConfigService) => async () => {
        await firstValueFrom(configService.initialize());
    },
});

export const withAuthorizedSession: () => FactoryProvider = () => ({
    provide: TEST_INITIALIZER,
    deps: [ConfigService, SessionService],
    useFactory: (configService: ConfigService, sessionService: SessionService) => async () => {
        getMockServiceWorker().use(
            http.post<PathParams, { state: string }>(
                `${baseBackEndURL}/session`,
                async ({ request }) => {
                    const { state } = await request.json();
                    const session = mockSessionDB.create(
                        new SessionBuilder().withTokens({ access: 'Access token', refresh: 'Refresh token' }).build()
                    );

                    return HttpResponse.json(
                        { data: { ...session }, state: state },
                        { headers: { 'Set-Cookie': `SESSION=${session.id}; HttpOnly; SameSite=Strict;` } }
                    );
                },
                { once: true }
            )
        );

        await firstValueFrom(configService.initialize().pipe(switchMap(() => sessionService.retrieveSession())));
    },
});
