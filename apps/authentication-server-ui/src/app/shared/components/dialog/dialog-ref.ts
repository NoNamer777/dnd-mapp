import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

export class DialogRef<T, R = unknown> {
    public componentRef: ComponentRef<T>;

    private readonly overlayRef: OverlayRef;

    private readonly close$ = new Subject<R>();

    constructor(overlayRef: OverlayRef) {
        this.overlayRef = overlayRef;
    }

    public close(result?: R) {
        this.close$.next(result);
        this.close$.complete();

        this.componentRef.destroy();
        this.overlayRef.dispose();
    }

    public afterClose() {
        return this.close$.asObservable();
    }
}
