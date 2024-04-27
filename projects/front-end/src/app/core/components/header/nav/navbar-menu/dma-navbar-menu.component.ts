import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    Output,
    QueryList,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DmaIconComponent, DmaIcons } from '@dnd-mapp/shared-components';
import { DmaNavLinkComponent } from '../nav-link/dma-nav-link.component';

@Component({
    selector: 'dma-navbar-menu',
    templateUrl: './dma-navbar-menu.component.html',
    styleUrl: './dma-navbar-menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, OverlayModule, DmaIconComponent],
})
export class DmaNavbarMenuComponent implements AfterContentInit {
    @Input() label: string;

    @Output() openChange = new EventEmitter<boolean>();

    protected open = false;

    @ContentChildren(DmaNavLinkComponent) private readonly navLinks: QueryList<DmaNavLinkComponent>;

    private readonly destroyRef = inject(DestroyRef);
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

    ngAfterContentInit() {
        this.navLinks.forEach((navLink) => {
            navLink.navigating.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: () => {
                    this.onMenuToggle();
                    this.changeDetectorRef.markForCheck();
                },
            });
        });
    }
}
