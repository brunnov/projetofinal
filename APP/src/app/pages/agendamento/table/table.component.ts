import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { DataServiceAgendamento } from '../agendamento.data.service';
import { Agendamento } from '../interface-agendamento';

@Component({
  selector: 'app-table-os',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private dataService: DataServiceAgendamento,
    public dialog: MatDialog,
    private router: Router,
  ) {}
  @Output() pedido = new EventEmitter();
  selecionado: any[] = [];
  data: any[] = [];
  toppingList: Agendamento[] = [];
  displayedColumns: string[] = [
    'select',
    'os',
    'abertura',
    'cliente',
    'status',
    'funcionario',
    'editar',
  ];
  dataSource = new MatTableDataSource<Agendamento>([]);
  selection = new SelectionModel<Agendamento>(true, []);

  ngOnInit() {
    this.dataService.getAgendamento().subscribe(
      (res: any) => {
        this.data = res;
        this.data.map(async (num) => {
          this.toppingList.push(num);
        });
        this.dataSource = new MatTableDataSource<Agendamento>(this.toppingList);
      },
      (err) => {
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
      this.selecionado = [];
      this.pedido.emit(this.selecionado);
    } else {
      this.dataSource.data.forEach((row) => {
        this.selection.select(row);
        this.selecionado.push(row.id_agendamento);
      });
      this.pedido.emit(this.selecionado);
    }
  }

  selecao(checked, row) {
    if (checked) {
      this.selecionado.push(row.id_agendamento);
    } else {
      this.selecionado.splice(this.selecionado.indexOf(row.id_agendamento), 1);
    }
    this.pedido.emit(this.selecionado);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Agendamento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id_agendamento + 1
    }`;
  }
  edicao(row): void {
    this.dataService.postAgendamentoBusca(row.id_agendamento).subscribe(
      (res: any) => {
        this.dataService.enviar(res);
        this.router.navigate(['/os']);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
