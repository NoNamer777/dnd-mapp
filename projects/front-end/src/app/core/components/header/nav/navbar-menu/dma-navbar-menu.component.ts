import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    Output,
    QueryList,
} from '@angular/core';
import { DmaIconComponent, DmaIcons } from '@dnd-mapp/shared-components';
import { Subject, takeUntil } from 'rxjs';
import { DmaNavLinkComponent } from '../nav-link/dma-nav-link.component';

@Component({
    selector: 'dma-navbar-menu',
    templateUrl: './dma-navbar-menu.component.html',
    styleUrl: './dma-navbar-menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, OverlayModule, DmaIconComponent],
})
export class DmaNavbarMenuComponent implements AfterContentInit, OnDestroy {
    @Input() label: string;

    @Output() openChange = new EventEmitter<boolean>();

    protected open = false;

    @ContentChildren(DmaNavLinkComponent) private readonly navLinks: QueryList<DmaNavLinkComponent>;

    private readonly destroy$ = new Subject<void>();

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    protected get menuIcon() {
        return this.open ? DmaIcons.CARET_UP : DmaIcons.CARET_DOWN;
    }

    protected onMenuToggle() {
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    protected onClickOutsideOverlay() {
        setTimeout(() => {
            if (!this.open) return;
            this.onMenuToggle();
            this.changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterContentInit() {
        this.navLinks.forEach((navLink) => {
            navLink.navigating.pipe(takeUntil(this.destroy$)).subscribe({
                next: () => {
                    this.onMenuToggle();
                    this.changeDetectorRef.markForCheck();
                },
            });
        });
    }
}
