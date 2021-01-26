import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceAgendamento } from '../agendamento.data.service';
import { Agendamento } from '../interface-agendamento';
export let selecionado: any[] = [];
@Component({
  selector: 'app-table-os',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataServiceAgendamento, public dialog: MatDialog) {
  }
  data: any[] = [];
  toppingList: Agendamento[] = [];
  displayedColumns: string[] = ['select', 'os', 'abertura', 'cliente', 'status', 'funcionario', 'editar'];
  dataSource = new MatTableDataSource<Agendamento>([]);
  selection = new SelectionModel<Agendamento>(true, []);

  ngOnInit() {

    this.dataService.getClientes().subscribe(
      (res: any) => {
        this.data = res;
        this.data.map(num => {
          this.toppingList.push(num);
        });
        this.dataSource = new MatTableDataSource<Agendamento>(this.toppingList);
      },
      err => {
        console.log(err);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      selecionado = [];

    } else {
      this.dataSource.data.forEach(row => {
      this.selection.select(row);
      selecionado.push(row.id_usuario);
    });
  }
  }

  selecao(checked, row) {
    if (checked) {
      selecionado.push(row.id_usuario);
    } else {
      selecionado.splice(selecionado.indexOf(row.id_usuario), 1);

    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Agendamento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_usuario + 1}`;
  }
  edicao(row): void {
  }


}
