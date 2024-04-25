import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SessionModel } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, tap } from 'rxjs';
import { DmaHttpRequestService } from '../http';

@Injectable({ providedIn: 'root' })
export class SessionService {
    readonly session$ = new BehaviorSubject<SessionModel>(null);

    private readonly requestService = inject(DmaHttpRequestService);
    private readonly destroyRef = inject(DestroyRef);

    retrieveSession() {
        return this.requestService.post<SessionModel>('/session', null, { withState: true }).pipe(
            tap((session) => this.session$.next(plainToInstance(SessionModel, session))),
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
