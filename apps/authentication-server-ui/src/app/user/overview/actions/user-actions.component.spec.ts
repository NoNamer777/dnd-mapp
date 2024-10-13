import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideDnDMappTesting, UserActionsHarness } from '@dnd-mapp/authentication-server-ui/testing';
import { noop } from 'rxjs';
import { defaultUsers } from '../../../../testing/mocks/db';
import { UserActionsComponent } from './user-actions.component';

describe('UserActionsComponent', () => {
    @Component({
        template: `<dma-user-actions [userId]="userId" />`,
    })
    class TestComponent {
        protected readonly userId = defaultUsers[0].id;
    }

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [UserActionsComponent],
            declarations: [TestComponent],
            providers: [provideDnDMappTesting()],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(UserActionsHarness),
        };
    }

    it('should edit User', async () => {
        const { harness } = await setupTest();
        const logSpy = spyOn(console, 'log').and.callFake(() => noop());

        await harness.edit();
        expect(logSpy).toHaveBeenCalledWith('Editing User with ID "mUaZQqsMMrOkP-wlbAiUR"');
    });

    it('should delete User', async () => {
        const { harness } = await setupTest();
        const logSpy = spyOn(console, 'log').and.callFake(() => noop());

        await harness.delete();
        expect(logSpy).toHaveBeenCalledWith('Deleting User with ID "mUaZQqsMMrOkP-wlbAiUR"');
    });
});
