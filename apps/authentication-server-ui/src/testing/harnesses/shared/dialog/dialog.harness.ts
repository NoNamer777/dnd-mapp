import { ComponentHarness } from '@angular/cdk/testing';
import {
    DialogContentHarness,
    DialogFooterHarness,
    DialogHeaderHarness,
} from '@dnd-mapp/authentication-server-ui/testing';

export class DialogHarness extends ComponentHarness {
    public static readonly hostSelector = '.dma-dialog-container';

    private readonly headerLocator = this.locatorFor(DialogHeaderHarness);
    private readonly contentLocator = this.locatorFor(DialogContentHarness);
    private readonly footerLocator = this.locatorForOptional(DialogFooterHarness);

    public async dismissDialog() {
        await (await this.headerLocator()).dismissDialog();
    }

    public async getDialogTitle() {
        return await (await this.headerLocator()).getTitle();
    }

    public async getDialogContent() {
        return await (await this.contentLocator()).getContent();
    }

    public async getHeader() {
        return await this.headerLocator();
    }

    public async getContent() {
        return await this.contentLocator();
    }

    public async getFooter() {
        return await this.footerLocator();
    }
}
