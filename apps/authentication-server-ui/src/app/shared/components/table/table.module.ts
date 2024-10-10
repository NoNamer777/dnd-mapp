import { NgModule } from '@angular/core';
import { TableBodyComponent } from './body/table-body.component';
import { TableColumnComponent } from './column/table-column.component';
import { TableHeaderComponent } from './header/table-header.component';
import { TableRowComponent } from './row/table-row.component';
import { TableComponent } from './table.component';

const components = [TableComponent, TableHeaderComponent, TableBodyComponent, TableRowComponent, TableColumnComponent];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class TableModule {}
