import { Component } from '@angular/core';
import { AccountStatusHarness, createTestEnvironment } from '@dnd-mapp/authentication-server-ui/testing';
import { AccountStatus } from '@dnd-mapp/data';
import { AccountStatusDotComponent } from './account-status-dot.component';

describe('AccountStatusDotComponent', () => {
    @Component({
        template: `<dma-account-status-dot [status]="accountStatus" />`,
        imports: [AccountStatusDotComponent],
    })
    class TestComponent {
        public accountStatus: AccountStatus = 'Active';
    }

    async function setupTest() {
        const { harness, component } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: AccountStatusHarness,
        });

        return {
            harness: harness,
            component: component,
        };
    }

    it('should reflect style of account status', async () => {
        const { harness, component } = await setupTest();

        expect(await harness.getStyling()).toEqual('color: var(--success);');

        component.accountStatus = 'Deactivated';
        expect(await harness.getStyling()).toEqual('opacity: var(--opacity-disabled);');

        component.accountStatus = 'Pending';
        expect(await harness.getStyling()).toEqual('color: var(--warning);');

        component.accountStatus = 'Deleted';
        expect(await harness.getStyling()).toEqual('opacity: var(--opacity-disabled);');

        component.accountStatus = 'Suspended';
        expect(await harness.getStyling()).toEqual('color: var(--danger);');
    });
});
