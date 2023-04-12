import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HeaderComponentHarness } from '../../../../testing';

describe('HeaderComponent', () => {
    async function setupTestEnvironment() {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
        }).compileComponents();

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(HeaderComponent));

        return {
            harness: await harnessLoader.getHarness(HeaderComponentHarness),
        };
    }

    it('should show the components text content', async () => {
        const { harness } = await setupTestEnvironment();
        expect(await harness.getTextContent()).toEqual('Header component works!');
    });
});
