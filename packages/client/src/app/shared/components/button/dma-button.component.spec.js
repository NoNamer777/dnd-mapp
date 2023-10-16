import { __decorate } from "tslib";
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DmaButtonHarness } from '../../../../testing';
import { DmaButtonModule } from './dma-button.module';
describe('ButtonComponent', () => {
    let TestComponent = class TestComponent {
        constructor() {
            this.buttonVariant = 'primary';
            this.toggle = false;
            this.outlined = false;
            this.small = false;
            this.large = false;
        }
    };
    TestComponent = __decorate([
        Component({
            template: `<button
            type="button"
            [dma-button]="buttonVariant"
            [toggle]="toggle"
            [outlined]="outlined"
            [small]="small"
            [large]="large"
        >
            My Button
        </button>`,
        })
    ], TestComponent);
    let DefaultTestComponent = class DefaultTestComponent {
    };
    DefaultTestComponent = __decorate([
        Component({
            template: `<button type="button" dma-button>My Button</button>`,
        })
    ], DefaultTestComponent);
    async function initializeTestEnvironment(params = { component: TestComponent }) {
        TestBed.configureTestingModule({
            imports: [DmaButtonModule],
            declarations: [DefaultTestComponent, TestComponent],
        });
        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(params.component));
        return {
            harness: await harnessLoader.getHarness(DmaButtonHarness),
        };
    }
    it('should create with default values', async () => {
        const { harness } = await initializeTestEnvironment({ component: DefaultTestComponent });
        expect(await harness.isButtonVariant('primary'));
    });
});
//# sourceMappingURL=dma-button.component.spec.js.map