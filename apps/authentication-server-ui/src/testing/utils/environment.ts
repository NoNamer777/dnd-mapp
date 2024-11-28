import { ComponentHarness, HarnessLoader, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRxjsTestingConfig } from '../providers/rxjs';

interface CreateTestEnvironmentParams<C, H extends ComponentHarness> {
    imports?: unknown[];
    providers?: unknown[];
    testComponent?: Type<C>;
    initFunction?: () => void | Promise<void>;
    harness?: Type<H>;
}

export async function createTestEnvironment<C, H extends ComponentHarness>(params: CreateTestEnvironmentParams<C, H>) {
    let fixture: ComponentFixture<C>;
    let harnessLoader: HarnessLoader;
    let harness: H;

    TestBed.configureTestingModule({
        imports: [...(params.imports ?? [])],
        declarations: params.testComponent ? [params.testComponent] : [],
        providers: [provideNoopAnimations(), provideRxjsTestingConfig(), ...(params.providers ?? [])],
    });

    if (params.initFunction) {
        await params.initFunction();
    }
    if (params.testComponent) {
        fixture = TestBed.createComponent(params.testComponent);
        harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params.harness) {
            harness = await harnessLoader.getHarness(params.harness as HarnessQuery<H>);
        }
        return {
            fixture: fixture,
            component: fixture.componentInstance,
            harnessLoader: harnessLoader,
            harness: harness,
        };
    }
    return null;
}
