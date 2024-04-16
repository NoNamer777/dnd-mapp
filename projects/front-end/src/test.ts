import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { setupMockServiceWorker } from '@dnd-mapp/front-end/testing';

const { startWorker, stopWorker, resetWorker } = setupMockServiceWorker();

beforeAll(startWorker);
afterAll(stopWorker);

afterEach(resetWorker);

getTestBed().initTestEnvironment([BrowserDynamicTestingModule], platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
});
