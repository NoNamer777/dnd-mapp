import { inject, Injectable, OnDestroy } from '@angular/core';
import { SessionModel } from '@dnd-mapp/data';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { DmaHttpRequestService } from '../http';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {
    session$ = new BehaviorSubject<SessionModel>(null);

    private readonly requestService = inject(DmaHttpRequestService);

    private readonly destroy$ = new Subject<void>();

    readonly retrieveSession$ = this.requestService.post<SessionModel>('/session', null, { withState: true }).pipe(
        tap((session) => this.session$.next(plainToInstance(SessionModel, session))),
        takeUntil(this.destroy$)
    );

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
