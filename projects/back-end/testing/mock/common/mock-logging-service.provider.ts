import { LoggerService } from '../../../src/app/common';

class MockLoggingService extends LoggerService {
    logs: { [context: string]: string[] } = {};

    override log(message: string) {
        if (!this.logs[this.context]) {
            this.logs[this.context] = [];
        }
        this.logs[this.context].push(message);
    }
}

export const mockLoggingServiceProvider = {
    provide: LoggerService,
    useClass: MockLoggingService,
};
