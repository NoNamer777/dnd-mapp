import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Session } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpRequestService } from '../http';

@Injectable({ providedIn: 'root' })
export class SessionService {
    readonly session$ = new BehaviorSubject<Session>(null);

    private readonly requestService = inject(HttpRequestService);
    private readonly destroyRef = inject(DestroyRef);

    retrieveSession() {
        return this.requestService.post<Session>('/session', null, { withState: true }).pipe(
            map((data) => plainToInstance(Session, data)),
            tap((session) => this.session$.next(session)),
            takeUntilDestroyed(this.destroyRef)
        );
    }
}
