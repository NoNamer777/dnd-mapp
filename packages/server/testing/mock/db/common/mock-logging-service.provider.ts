import { DndMappLoggerService } from '../../../../src/app/common';

class MockLoggingService extends DndMappLoggerService {
    logs: { [context: string]: string[] } = {};

    override log(message: string) {
        if (!this.logs[this.context]) {
            this.logs[this.context] = [];
        }
        this.logs[this.context].push(message);
    }
}

export const mockLoggingServiceProvider = {
    provide: DndMappLoggerService,
    useClass: MockLoggingService,
};
