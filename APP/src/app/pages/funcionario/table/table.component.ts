import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceFuncionario } from '../funcionario.data.service';
import { Funcionario } from '../interface-funcionario';
import { ModalComponent } from '../modal/modal.component';
export let selecionado: any[] = [];

@Component({
  selector: 'app-table-funcionario',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataServiceFuncionario, public dialog: MatDialog) {
  }
  data: any[] = [];
  toppingList: Funcionario[] = [];
  displayedColumns: string[] = ['select', 'id', 'nome', 'cpf_cnpj', 'telefone', 'email'];
  dataSource = new MatTableDataSource<Funcionario>([]);
  selection = new SelectionModel<Funcionario>(true, []);

  ngOnInit() {

    this.dataService.getFuncionarios().subscribe(
      (res: any) => {
        this.data = res;
        this.data.map(num => {
          this.toppingList.push(num);
        });
        this.dataSource = new MatTableDataSource<Funcionario>(this.toppingList);
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

  edicao(row): void {
    this.dataService.postFuncionarios(row.id_usuario).subscribe(
          (res: any) => {
            this.data = res;
            const dialogRef = this.dialog.open(ModalComponent, {
              width: '600px',
              height: '600px',
              data: {nome: res[0].nome_razaosocial, email: res[0].email, endereco: res[0].endereco, telefone: res[0].telefone,
              senha: res[0].senha, cpf_cnpj: res[0].CPF_CNPJ, responsavel: res[0].responsavel, diapagamento: res[0].dia_pagamento,
              formapagamento: res[0].codigo_forma_pagamento, header: 'Editar Funcionario', login: res[0].login  },
            });
            dialogRef.afterClosed().subscribe(result => {
              let p;
              let d;
              console.log('The dialog was closed');

              this.dataService.postFuncionarioEdicao(this.data[0].Id_Usuario, result.nome, result.email, result.endereco,
                result.cpf_cnpj, result.telefone, result.senha, p, result.responsavel, d).subscribe(
                (res: any) => {
                  this.data = res;
                  if ( this.data === ['rollback']) {
                    alert('erro');
                  }
                },
                err => {
                  console.log(err);
                }
              );
            });
          },
          err => {
            console.log(err);
          }
        );
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
  checkboxLabel(row?: Funcionario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_usuario + 1}`;
  }
}
