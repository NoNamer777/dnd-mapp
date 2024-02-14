import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DmaIconButtonComponent } from '../../icon-button';

@Component({
    selector: 'dma-navigation-bar-button',
    templateUrl: './dma-navigation-bar-button.component.html',
    styleUrl: './dma-navigation-bar-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, DmaIconButtonComponent],
})
export class DmaNavigationBarButtonComponent implements OnInit {
    @Output() activeChange = new EventEmitter<boolean>();

    @Input() path?: string;

    get active() {
        return this._active;
    }
    @Input() set active(active: boolean) {
        if (active === this._active) return;

        this._active = active;
        this.changeDetectorRef.markForCheck();
    }
    @HostBinding('class.active')
    private _active = false;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit() {
        if (!this.path) return;

        const activeRoute = this.activatedRoute.snapshot.url.join('');

        this.active = activeRoute.includes(this.path);
    }

    async onSelect() {
        if (!this.path || this.active) return;

        this.active = true;
        this.activeChange.emit(this.active);

        await this.router.navigate([this.path]);
    }
}
