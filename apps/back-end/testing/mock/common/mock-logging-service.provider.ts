import { LoggerService } from '../../../src/app/common';

class MockLoggingService extends LoggerService {
    logs: { [context: string]: string[] } = {};

    override warn(message: string) {
        this.addMessage(message);
    }

    override log(message: string) {
        this.addMessage(message);
    }

    private addMessage(message: string) {
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
