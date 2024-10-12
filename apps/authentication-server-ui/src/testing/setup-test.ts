import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { resetListeners, startServer, stopServer } from './mocks/authentication-server';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

beforeAll(() => startServer());

beforeEach(() => resetListeners());

afterAll(() => stopServer());
