import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Session } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, tap } from 'rxjs';
import { DmaHttpRequestService } from '../http';

@Injectable({ providedIn: 'root' })
export class SessionService {
    readonly session$ = new BehaviorSubject<Session>(null);

    private readonly requestService = inject(DmaHttpRequestService);
    private readonly destroyRef = inject(DestroyRef);

    retrieveSession() {
        return this.requestService.post<Session>('/session', null, { withState: true }).pipe(
            tap((session) => this.session$.next(plainToInstance(Session, session))),
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
