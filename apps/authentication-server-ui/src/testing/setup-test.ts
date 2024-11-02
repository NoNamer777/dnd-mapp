import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { resetListeners, startServer, stopServer } from './mocks/authentication-server';
import { resetDatabases } from './mocks/db';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

beforeAll(async () => await startServer());

beforeEach(() => {
    resetDatabases();
    resetListeners();
});

afterAll(() => stopServer());
