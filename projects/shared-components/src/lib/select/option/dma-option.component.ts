import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { DmaSelectComponent } from '@dnd-mapp/shared-components';
import { DmaStateDirective } from '../../state';

@Component({
    selector: 'dma-option',
    templateUrl: './dma-option.component.html',
    styleUrl: './dma-option.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DmaStateDirective],
    standalone: true,
    imports: [DmaStateDirective],
})
export class DmaOptionComponent extends DmaStateDirective implements OnInit {
    @Input() label: string;
    @Input() value: unknown;

    @Input({ transform: booleanAttribute }) disabled = false;

    @Input() set selected(selected: boolean) {
        this._selected = selected;
    }
    get selected() {
        return this._selected;
    }
    @HostBinding('class.selected') private _selected = false;

    @Output() readonly selectedChange = new EventEmitter<boolean>();

    selected$ = this.selectedChange.asObservable();

    private readonly select = inject(DmaSelectComponent);

    override get baseLayerColor() {
        return 'var(--surface-container)';
    }

    override get stateLayerColor() {
        return 'var(--on-surface)';
    }

    ngOnInit() {
        this.selected = this.select.value === this.value;
    }

    @HostListener('click')
    onSelect() {
        if (this.disabled || this.selected) return;
        this.selected = true;
        this.selectedChange.emit(this.selected);
    }
}
