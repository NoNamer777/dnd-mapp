import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    OnDestroy,
    QueryList,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DmaNavigationBarButtonComponent } from './button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'footer[dma-navigation-bar]',
    templateUrl: './dma-navigation-bar.component.html',
    styleUrl: './dma-navigation-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, DmaNavigationBarButtonComponent],
})
export class DmaNavigationBarComponent implements AfterViewInit, OnDestroy {
    @ContentChildren(DmaNavigationBarButtonComponent) buttons: QueryList<DmaNavigationBarButtonComponent>;

    private destroy$ = new Subject<void>();

    private currentActiveBtn: DmaNavigationBarButtonComponent = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.buttons.forEach((button) => {
            button.activeChange.pipe(takeUntil(this.destroy$)).subscribe({
                next: () => this.setActiveButton(button),
            });
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setActiveButton(button: DmaNavigationBarButtonComponent) {
        if (this.currentActiveBtn) {
            this.currentActiveBtn.active = false;
        }
        this.currentActiveBtn = button;
        this.changeDetectorRef.detectChanges();
    }
}
