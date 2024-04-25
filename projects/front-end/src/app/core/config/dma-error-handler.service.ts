import { ErrorHandler, inject, Injectable } from '@angular/core';
import { BackEndError, statusTextForCode } from '@dnd-mapp/data';
import { NotificationService } from '../../shared';

export const provideErrorHandler = () => ({
    provide: ErrorHandler,
    useClass: DmaErrorHandler,
});

@Injectable({ providedIn: 'root' })
export class DmaErrorHandler implements ErrorHandler {
    private readonly notificationService = inject(NotificationService);

    handleError(error: unknown) {
        console.error(error);

        if (error instanceof BackEndError) {
            this.notificationService.show({
                type: 'error',
                message: error.message,
                title: `(${error.status}) ${statusTextForCode(error.status)}`,
            });
        }
    }
}
